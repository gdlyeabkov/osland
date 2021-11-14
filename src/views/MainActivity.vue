<template>
  <div :style="`width: ${orientation ? '50%' : '100%'};`">
    <div v-if="isUnlock" class="wallpapers" ref="wallpapers" @dblclick="isAppsList = true" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')" :style="`width: ${orientation ? '50%' : '100%'}; background-size: cover;`"></div>
    <Curtain :currentTime="currentTime" :batteryLevel="batteryLevel" :soundMode="currentSoundMode" @openSearch="openSearchHandler" @openApp="openAppHandler" @openPowerDialog="openPowerDialogHandler" @changeBrightness="changeBrightnessHandler" @changeOrientation="changeOrientationHandler" @filterBlueColor="filterBlueColorHandler" />
    <OpenedApp v-if="appIsOpen" :appInfo="appInfo" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <div v-if="!isAppsList">
      <!-- <div class="appRow">
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000) })" @mousedown="holdApp($event, 'down', { processId: Math.floor(Math.random() * 5000), name: 'abc' })" @mouseup="holdApp($event, 'up', { processId: Math.floor(Math.random() * 5000), name: 'abc' })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
      </div>
      <div class="appRow">
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
      </div>
      <div class="appRow">
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
      </div>
      <div class="appRow">
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
      </div>
      <div class="appRow">
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
        <div @click="openApp({ processId: Math.floor(Math.random() * 5000), })" class="app">
        </div>
      </div> -->
      
      <div v-for="appsRow in apps.flatMap((app, appIndex) => appIndex).filter((appsRow, appsRowIdx) => {
        return appsRowIdx <= countAppsRows - 1
      })" :key="appsRow" class="appRow">
        <div v-for="app in apps.filter((app, appIdx) => {
          return appIdx >= appsRow * countAppsPerRow && appIdx < countAppsPerRow * (appsRow + 1) && app.shortcut
        })" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', app)" @mouseup="holdApp($event, 'up', app)" class="app" :style="`background-image: url('http://localhost:4000/api/apps/favicons/get/?appname=${app.name}.png');`">
        </div>
      </div>

    </div>
    <AppsList v-if="isAppsList" :apps="apps" :countAppsRows="countAppsRows" :countAppsPerRow="countAppsPerRow" :orientation="orientation" @openApp="openAppHandler" @holdApp="holdApp" @isSearch="isSearchHandler" @closeContextMenu="closeContextMenuHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <OpenedApps v-if="isOpenedApps" :openedAppItems="openedApps" @openApp="openAppHandler" @closeApp="closeAppHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <ContextMenu v-if="isContextMenu" :origin="originContextMenu" :appInfo="appInfoContextMenu" :isAppsList="isAppsList" @closeContextMenu="closeContextMenuHandler" @changeAppShortcut="changeAppShortcutHandler" @deleteApp="deleteAppHandler" />
    <SystemBtns @handleUndoBtn="handleUndoBtnHandler" @handleHomeBtn="handleHomeBtnHandler" @handeOpenedAppsBtn="handeOpenedAppsBtnHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <Lock v-if="!isUnlock" :currentTime="currentTime" :settings="settings" @unlock="unlockHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <PowerDialog v-if="isPowerDialog" @closePowerDialog="closePowerDialogHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <SleepMode v-if="isSleep" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <Speakers :source="activeSound" :startPlay="isStartPlay"  :soundCommand="activeSoundCommand" :isSpeakersDialog="isSpeakersDialog" @resetSpeakers="resetSpeakersHandler" @transferSoundMode="transferSoundModeHandler" />
  </div>
  
</template>

<script>
import AppsList from '@/components/AppsList.vue'
import SystemBtns from '@/components/SystemBtns.vue'
import Curtain from '@/components/Curtain.vue'
import OpenedApp from '@/components/OpenedApp.vue'
import OpenedApps from '@/components/OpenedApps.vue'
import PowerDialog from '@/components/PowerDialog.vue'
import Lock from '@/components/Lock.vue'
import SleepMode from '@/components/SleepMode.vue'
import Speakers from '@/components/Speakers.vue'
import ContextMenu from '@/components/ContextMenu.vue'

export default {
  name: 'MainActivity',
  data(){
    return {
      apps: [

      ],
      isAppsList: false,
      appIsOpen: false,
      isOpenedApps: false,
      openedApps: [

      ],
      handleWallpapers: false,
      isPowerDialog: false,
      isUnlock: false,
      activeKey: '',
      isSleep: true,
      activeSound: '',
      isStartPlay: false,
      activeSoundCommand: '',
      isSpeakersDialog: false,
      isContextMenu: false,
      appSelected: false,
      originContextMenu: {
        x: 0,
        y: 0
      },
      appInfoContextMenu: {
        name: 'XXXX',
        processId: '1'
      },
      countAppsRows: 4,
      countAppsPerRow: 4,
      appInfo: {},
      currentTime: `${new Date().toLocaleTimeString().split(':')[0]}:${new Date().toLocaleTimeString().split(':')[1]}`,
      batteryLevel: 1,
      isSearch: false,
      currentSoundMode: 0,
      orientation: false,
      settings: {

      }
    }
  },
  mounted() {
    
    this.uploadApps()

    window.addEventListener('keydown', (event) => {
      let tempActiveKey = event.key
      this.activeKey = event.key
      setTimeout(() => {
        if(this.activeKey === tempActiveKey) {
          if(this.activeKey === 'q' && !this.isSearch) {
            this.isPowerDialog = true
          }
          return
        }
      }, 3000)
    })
    window.addEventListener('keyup', (event) => {
      if(event.key === 'q' && !this.isSearch) {
        this.isSleep = !this.isSleep
        this.isUnlock = false
      } else if(event.key === '+') {
        this.activeSoundCommand = 'volume turn up'
        // this.activeSound = '../../sounds/volumeturn.wav'
        this.activeSound = '../../sounds/krik.mp3'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      } else if(event.key === '-') {
        this.activeSoundCommand = 'volume turn down'
        // this.activeSound = '../../sounds/volumeturn.wav'
        this.activeSound = '../../sounds/krik.mp3'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      }
      this.activeKey = ''
    })

    navigator.getBattery().then(battery => {
      this.batteryLevel = battery.level
    })
    setInterval(() => {
      // обновление время
      let time = new Date().toLocaleTimeString()
      let timeSeparator = ':'
      let timesParts = time.split(timeSeparator)
      let hours = timesParts[0]
      let minutes = timesParts[1]
      let currentTime = `${hours}:${minutes}`
      this.currentTime = currentTime
      // обновление заряда
      navigator.getBattery().then(battery => {
          this.batteryLevel = battery.level
      })  
    }, 60000)

  },
  methods: {
    filterBlueColorHandler(toggler) {
      this.$refs.wallpapers.style = `
        -webkit-filter: contrast(${!toggler ? '100%' : '50%'});
      `
    },
    deleteAppHandler(appInfo) {
      fetch(`http://localhost:4000/api/apps/delete/?appname=${appInfo.name}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        
      });
      setTimeout(() => {
        this.uploadApps()
        this.isContextMenu = false
      }, 1000)
    },
    changeOrientationHandler(newOrientation) {
      this.orientation = newOrientation
    },
    transferSoundModeHandler(soundMode) {
      console.log(`получаю звуковый профиль: ${soundMode}`)
      this.currentSoundMode = soundMode
    },
    uploadApps() {
      fetch(`http://localhost:4000/api/apps/all/get/`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        this.apps = JSON.parse(result).apps
        this.settings = JSON.parse(result).settings
        console.log(`settings: ${Object.keys(this.settings)}; ${Object.values(this.settings)}`)
        console.log(`settings: ${JSON.stringify(this.settings)}`)
        console.log(`settingsLockScreenMode: ${this.settings.lockScreen.mode}`)
      });
    },
    changeAppShortcutHandler(app, isShortcut) {
      fetch(`http://localhost:4000/api/apps/shortcut/set/?appname=${app.name}&appshortcut=${isShortcut}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        this.isContextMenu = false
        if(JSON.parse(result).status === 'OK') {
          this.uploadApps()
        }
      });
    },
    isSearchHandler(isSearch) {
      this.isSearch = isSearch
    },
    changeBrightnessHandler(brightnessPercent) {
      this.$refs.wallpapers.style = `
        -webkit-filter: brightness(${brightnessPercent / 100});
      `
    },
    openSearchHandler() {
      this.isAppsList = true
    },
    closeContextMenuHandler() {
      this.isContextMenu = false
    },
    openPowerDialogHandler() {
      this.isPowerDialog = true
    },
    holdApp(event, gesture, appInfo) {
      this.contextMenuDelayer = null
      if(gesture === 'down') {
        this.appSelected = true
        this.contextMenuDelayer = setTimeout(() => {
          if(this.appSelected) {
            this.appInfoContextMenu = appInfo
            this.originContextMenu = {
              x: event.x - 35,
              y: event.y - 35
            }
            this.isContextMenu = true
          }
        }, 2000)
      } else if(gesture === 'up') {
        this.appSelected = false
      }
    },
    resetSpeakersHandler() {
      this.activeSound = ''
      this.isStartPlay = false
      this.activeSoundCommand = ''
      this.isSpeakersDialog = false
    },
    unlockHandler() {
      this.isUnlock = true
    },
    closePowerDialogHandler(){
      this.isPowerDialog = false
    },
    handleGesture(event, gesture){
      if(gesture === 'down') {
        this.handleWallpapers = true
      } else if(gesture === 'move') {
        if(this.handleWallpapers) {
          window.scroll(event.x, 0)
        }
      } else if(gesture === 'up') {
        this.handleWallpapers = false
        this.isContextMenu = false
      }
    },
    closeAppHandler(appInfo){
      console.log(`closeAppHandler: ${Object.keys(appInfo)}; ${Object.values(appInfo)};`)
      this.openedApps = this.openedApps.filter(openedApp => {
        return openedApp.processId !== appInfo.processId
      })
      if(this.openedApps.length === 0) {
        this.isOpenedApps = false
        this.appIsOpen = false
      }
    },
    openApp(appInfo){
      this.activeKey = ''
      this.isAppsList = false
      this.isContextMenu = false
      let  openedAppsIds = []
      if(this.openedApps.length >= 1) {
        openedAppsIds = this.openedApps.flatMap(openedApp => openedApp.processId)
      }
      let appAlreadyRunning = openedAppsIds.includes(appInfo.processId)
      this.appIsOpen = true
      this.appInfo = appInfo
      this.isOpenedApps = false
      if(!appAlreadyRunning || this.openedApps.length <= 0) {
        this.openedApps.push({
          processId: appInfo.processId,
          name: appInfo.name
        })
      }
    },
    handleUndoBtnHandler(){
      if(!this.appIsOpen)
      this.isContextMenu = false
      this.isAppsList = false
      this.isOpenedApps = false
    },
    handleHomeBtnHandler(){
      this.isContextMenu = false
      this.isAppsList = false
      this.appIsOpen = false
      this.isOpenedApps = false
    },
    handeOpenedAppsBtnHandler() {
      // this.appIsOpen = false
      this.isContextMenu = false
      this.isOpenedApps = !this.isOpenedApps
    },
    openAppHandler(appInfo) {
      this.openApp(appInfo)
    }
  },
  components: {
    AppsList,
    SystemBtns,
    Curtain,
    OpenedApp,
    OpenedApps,
    PowerDialog,
    Lock,
    SleepMode,
    Speakers,
    ContextMenu
  }
}
</script>