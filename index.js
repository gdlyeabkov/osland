const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()

// const si = require('systeminformation')
const osu = require('node-os-utils')

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const url = `mongodb+srv://glebClusterUser:glebClusterUserPassword@cluster0.fvfru.mongodb.net/apps?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const AppSchema = new mongoose.Schema({
    name: String,
    processId: Number,
    shortcut: {
        type: Boolean,
        default: false
    }
}, { collection : 'myapps' });

const AppModel = mongoose.model('AppModel', AppSchema);

const SettingsSchema = new mongoose.Schema({
    lockScreen: {
        type: mongoose.Schema.Types.Object,
        default: {
            mode: 'moveSlide',
            watchStyle: 'normal'
        }
    },
    wallpapers: {
        mainScreen: {
            type: String,
            default: 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg'
        },
        lockScreen: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
        }
    },
    specialCapabilities: {
        voiceAssistant: {
            enabled: {
                type: Boolean,
                default: false
            }
        }
    },
    topic: {
        type: String,
        default: 'dark'
    },
    general: {
        language: {
            type: 'String',
            default: 'Русский'
        }
    },
    deviceUsabilityAndParentControl: {
        displayTimeout: {
            type: Number,
            default: 60
        }
    },
    deviceManagement: {
        type: Object,
        default: {
            cpu: 0,
            drive: 0,
            memory: 0
        }
    },
    notifications: {
        enabled: {
            type: Boolean,
            default: true
        }
    }
}, { collection : 'mysettings' });

const SettingsModel = mongoose.model('SettingsModel', SettingsSchema);

app.get('/api/apps/all/get',(req, res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    let query = AppModel.find({  })
    query.exec((err, apps) => {
        if (err) {
            return res.json({ status: "Error", apps: [], settings: [] })
        }
        let query = SettingsModel.find({  })
        query.exec((err, settings) => {
            if (err) {
                return res.json({ status: "Error", apps: [], settings: [] })
            }
            return res.json({ apps: apps, settings: settings[0], status: 'OK' })
        })
    })

})

app.get('/api/settings/create', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    let cpusCount = await osu.cpu.count()
    let driveSpace = 0
    osu.drive.info()
    .then(info => {
        driveSpace = info.totalGb
    })
    let memorySize = 0
    osu.mem.info().then(info => {
        memorySize = Math.floor(info.totalMemMb / 1000)
    })
    await SettingsModel.deleteMany({  })
    new SettingsModel({
        deviceManagement: {
            cpu: cpusCount,
            drive: driveSpace,
            memory: memorySize
        }
    }).save(function (err) {
        return res.json({ status: 'OK' })
    })

})

app.get('/api/apps/create', (req, res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
   
    new AppModel({ name: req.query.appname, processId: Math.floor(Math.random() * 5000) }).save(function (err) {
        if(err){
            return res.json({ 'status': 'Error' })
        } else {
            return res.json({ 'status': 'OK' })
        }
    })

})

app.get('/api/apps/favicons/get', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    return res.sendFile(__dirname + `/favicons/${req.query.appname}`)
})

app.get('/api/apps/shortcut/set', (req, res) => {
     
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    AppModel.updateOne({ name: req.query.appname }, { shortcut: req.query.appshortcut }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })
    
})

app.get('/api/apps/delete', async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    await AppModel.deleteOne({ name: req.query.appname  })

})

app.get('/api/settings/lockscreen/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { lockScreen: { mode: req.query.lockscreenmode, watchStyle: req.query.watchstyle  } }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/wallpapers/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.lockscreen: ${req.query.lockscreen}; req.query.mainScreen: ${req.query.mainscreen};`)
    SettingsModel.update({  }, { wallpapers: { mainScreen: req.query.mainscreen, lockScreen: req.query.lockscreen } }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/specialcapabilities/voiceassistant/enabled/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.enabled: ${req.query.enabled}`)
    SettingsModel.update({  }, { specialCapabilities: { voiceAssistant: { enabled: req.query.enabled } } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/topic/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.topic: ${req.query.topic}`)
    SettingsModel.update({  }, { topic: req.query.topic }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/reset', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let defaultSettings = {
        lockScreen: {
            mode: 'moveSlide',
            watchStyle: 'normal'
        },
        wallpapers: {
            mainScreen: 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg',
            lockScreen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
        },
        specialCapabilities: {
            voiceAssistant: {
                enabled: false
            }
        },
        topic: 'dark',
        general: {
            language: 'Русский'
        },
        deviceUsabilityAndParentControl: {
            displayTimeout: 60
        }
    }
    SettingsModel.update({  }, defaultSettings, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/general/language/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.language: ${req.query.language}`)
    SettingsModel.update({  }, { general: { language: req.query.language } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/deviceusabilityandparentcontrol/timeout/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.timeout: ${req.query.timeout}`)
    SettingsModel.update({  }, { deviceUsabilityAndParentControl: { displayTimeout: Number(req.query.timeout) } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/notifications/enabled/set', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.enabled: ${req.query.enabled}`)
    SettingsModel.update({  }, { notifications: { enabled: req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('**', (req, res) => { 
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    return res.redirect(`http://localhost:4000/?redirectroute=${req.path}`)

})

// const port = process.env.PORT || 8080
const port = 4000  

app.listen(port)