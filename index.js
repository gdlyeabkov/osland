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
            watchStyle: 'normal',
            password: '123456',
            notifications: {
                enabled: {
                    type: Boolean,
                    default: true
                },
                style: {
                    type: String,
                    default: 'icons'
                },
                hideInfo: {
                    type: Boolean,
                    default: true
                },
                showOnlyEmergency: {
                    type: Boolean,
                    default: false
                }
            }
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
        },
        languageAndInput: {
            tts: {
                speed: {
                    type: String,
                    default: '1.5'
                },
                pitch: {
                    type: String,
                    default: '0.6'
                }
            },
            pointerSpeed: {
                type: String,
                default: '1'
            },
            isLeftMainMouseBtn: {
                type: Boolean,
                default: true
            }
        },
        dateAndTime: {
            fullHoursFormat: {
                type: Boolean,
                default: true
            }
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
        },
        options: {
            type: String,
            default: 'last'
        },
        showBatteryPercents: {
            type: Boolean,
            default: false
        }
    },
    display: {
        fontSize: {
            type: Number,
            default: 0
        },
        displayTimeout: {
            type: Number,
            default: 60
        },
        navigation: {
            type: {
                type: String,
                default: "buttons"
            },
            buttonsOrder: {
                type: String,
                default: "left"
            }
        },
        screenScale: {
            type: Number,
            default: 1
        },
        mainScreen: {
            grid: {
                rows: {
                    type: Number,
                    default: 4
                },
                cols: {
                    type: Number,
                    default: 4
                }
            },
            layout: {
                type: Boolean,
                default: true
            }
        },
        appsScreen: {
            grid: {
                rows: {
                    type: Number,
                    default: 4
                },
                cols: {
                    type: Number,
                    default: 4
                }
            }
        }
    },
    updates: {
        lastCheck: {
            type: String,
            default: new Date().toLocaleString()
        },
        lastUpdate: {
            type: String,
            default: new Date().toLocaleString()
        }
    },
    accountsAndArchive: {
        accounts: [mongoose.Schema.Types.Map]
    },
    auxiliaryFunctions: {
        emergencyMessages: {
            type: Boolean,
            default: false
        },
        motionAndGestures: {
            simpleDisableSound: {
                type: Boolean,
                default: false
            },
            directCall:  {
                type: Boolean,
                default: false
            },
            gesturesImprints:  {
                type: Boolean,
                default: false
            },
            fastCall:  {
                type: Boolean,
                default: false
            }
        },
        screenshots: {
            format: {
                type: String,
                default: 'jpg'
            }
        }
    },
    privacy: {
        bugReports: {
            type: Boolean,
            default: true
        },
        marketInfo: {
            type: Boolean,
            default: true
        }
    },
    connections: {
        otherSettings: {
            find: {
                type: Boolean,
                default: true
            },
            print: {
                type: Boolean,
                default: true
            },
            vpn: {
                type: Boolean,
                default: false
            },
            dns: {
                type: Boolean,
                default: false
            }
        },
        mobileHotspotAndModem: {
            mobileHotspot: {
                type: Boolean,
                default: false
            },
            bluetooth: {
                type: Boolean,
                default: false
            },
            usb: {
                type: Boolean,
                default: false
            }
        },
        simsManager: {
            rings: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: true
            },
            mobileData: {
                type: Boolean,
                default: false
            }
        },
        wifi: {
            type: Boolean,
            default: false
        },
        bluetooth: {
            type: Boolean,
            default: false
        },
        airplaneMode: {
            type: Boolean,
            default: false
        }
    },
    developerParameters: {
        touchPlace: {
            type: Boolean,
            default: false
        },
        enabled: {
            type: Boolean,
            default: false
        },
        showTouches: {
            type: Boolean,
            default: false
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

app.get('/api/settings/lockscreen/mode/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { "$set": { 'lockScreen.mode': req.query.lockscreenmode, 'lockScreen.password': req.query.lockscreenpassword } }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/lockscreen/watchstyle/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { "$set": { 'lockScreen.watchStyle': req.query.watchstyle } }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/wallpapers/mainscreen/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'wallpapers.mainScreen': req.query.mainscreen } }, (err, app) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/wallpapers/lockscreen/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'wallpapers.lockScreen': req.query.lockscreen } }, (err, app) => {
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
            watchStyle: 'normal',
            notifications: {
                enabled: true,
                style: 'icons',
                hideInfo: true,
                showOnlyEmergency: false
            }
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
            language: 'Русский',
            languageAndInput: {
                isLeftMainMouseBtn: true,
                pointerSpeed: '1',
                tts: {
                    speed: '1.5',
                    pitch: '0.6'
                },
            },
            dateAndTime: {
                fullHoursFormat: true
            }
        },
        deviceUsabilityAndParentControl: {
            displayTimeout: 60
        },
        notifications: {
            enabled: true,
            options: 'last',
            showBatteryPercents: false
        },
        auxiliaryFunctions: {
            emergencyMessages: false,
            motionAndGestures: {
                simpleDisableSound: false,
                directCall: false,
                gesturesImprints: false,
                fastCall: false,
            }
        },
        privacy: {
            bugReports: true,
            marketInfo: true
        },
        display: {
            fontSize: 0,
            displayTimeout: 60,
            navigation: {
                type: 'buttons',
                buttonsOrder: 'left'
            },
            screenScale: 1,    
            mainScreen: {
                grid: {
                    rows: 4,
                    cols: 4
                },
                layout: true
            },
            appsScreen: {
                grid: {
                    rows: 4,
                    cols: 4
                }
            }
        },
        connections: {
            otherSettings: {
                find: true,
                print: true,
                vpn: false,
                dns: false
            },
            mobileHotspotAndModem: {
                mobileHotspot: false,
                bluetooth: false,
                usb: false
            },
            simsManager: {
                rings: true,
                sms: true,
                mobileData: false
            },
            wifi: false,
            bluetooth: false,
            airplaneMode: false
        },
        developerParameters: {
            touchPlace: false,
            enabled: false,
            showTouches: false
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

app.get('/api/settings/display/fontsize/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'display.fontSize': req.query.fontsize } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/navigation/type/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'display.navigation.type': req.query.type } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/navigation/buttonsorder/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'display.navigation.buttonsOrder': req.query.order } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/display/screenscale/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'display.screenScale': req.query.screenscale } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/notifications/showbatterypercents/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'notifications.showBatteryPercents': req.query.show } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/general/dateandtime/fullhoursformat/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'general.dateAndTime.fullHoursFormat': req.query.full } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })        
        }
        return res.json({ status: 'OK' })    
    })

})

app.get('/api/settings/accounsandarchieve/accounts/add', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  },
        { $push: 
            {
                'accountsAndArchive.accounts': [
                    {
                        login: req.query.accountlogin,
                        service: req.query.accountservice

                    }
                ]
                
            }
    }, (err, settings) => {
        if(err){
            return res.json({ "status": "Error" })
        } else {
            return res.json({ "status": "OK" })
        }
    })

})

app.get('/api/settings/notifications/options/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'notifications.options': req.query.options } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/general/languageandinput/pointerspeed/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'general.languageAndInput.pointerSpeed': req.query.speed } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/general/languageandinput/isleftmainmousebtn/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'general.languageAndInput.isLeftMainMouseBtn': req.query.isleftbtn } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/general/languageandinput/tts/speed/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'general.languageAndInput.tts.speed': req.query.speed } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/general/languageandinput/tts/pitch/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'general.languageAndInput.tts.pitch': req.query.pitch } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/emergencymessages/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.emergencyMessages': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/motionandgestures/simpledisablesound/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.motionAndGestures.simpleDisableSound': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/motionandgestures/directcall/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.motionAndGestures.directCall': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/motionandgestures/gesturesImprints/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.motionAndGestures.gesturesImprints': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/motionandgestures/fastcall/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.motionAndGestures.fastCall': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/auxiliaryfunctions/screenshots/format/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'auxiliaryFunctions.screenshots.format': req.query.format } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/privacy/marketinfo/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'privacy.marketInfo': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/privacy/bugreports/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'privacy.bugReports': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/lockscreen/notifications/enabled/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'lockScreen.notifications.enabled': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/lockscreen/notifications/style/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'lockScreen.notifications.style': req.query.style } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/lockscreen/notifications/hideinfo/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'lockscreen.notifications.hideInfo': req.query.hide } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/lockscreen/notifications/showonlyemergency/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'lockScreen.notifications.showOnlyEmergency': req.query.show } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/display/mainscreen/grid/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let grid = req.query.grid.split('X')
    let rows = Number(grid[0])
    let cols = Number(grid[1])
    SettingsModel.update({  }, { '$set': { 'display.mainScreen.grid': { rows: rows, cols: cols } } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/display/appsscreen/grid/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let grid = req.query.grid.split('X')
    let rows = Number(grid[0])
    let cols = Number(grid[1])
    SettingsModel.update({  }, { '$set': { 'display.appsScreen.grid': { rows: rows, cols: cols } } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/display/mainscreen/layout/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    console.log(`req.query.layout: ${req.query.layout}`)
    SettingsModel.update({  }, { '$set': { 'display.mainScreen.layout': req.query.layout } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/othersettings/find/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.otherSettings.find': req.query.find } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/othersettings/print/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.otherSettings.print': req.query.print } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/othersettings/vpn/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.otherSettings.vpn': req.query.vpn } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/othersettings/dns/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.otherSettings.dns': req.query.dns } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/mobilehotspotandmodem/mobilehotspot/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.mobileHotspotAndModem.mobileHotspot': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/mobilehotspotandmodem/bluetooth/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.mobileHotspotAndModem.bluetooth': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/mobilehotspotandmodem/usb/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.mobileHotspotAndModem.usb': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/simsmanager/rings/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.simsManager.rings': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/simsmanager/sms/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.simsManager.sms': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/simsmanager/mobiledata/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.simsManager.mobileData': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/wifi/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.wifi': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/airplaneMode/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.airplaneMode': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/connections/bluetooth/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'connections.bluetooth': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/developerparameters/touchplace/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'developerParameters.touchPlace': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/developerparameters/enabled/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'developerParameters.enabled': req.query.enabled } }, (err, settings) => {
        if(err){
            return res.json({ status: 'Error' })
        }
        return res.json({ status: 'OK' })
    })

})

app.get('/api/settings/developerparameters/showtouches/set', (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    SettingsModel.update({  }, { '$set': { 'developerParameters.showTouches': req.query.show } }, (err, settings) => {
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