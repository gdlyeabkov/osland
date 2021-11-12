<template>
  <div>
    <div v-if="isUnlock" class="wallpapers" ref="wallpapers" @dblclick="isAppsList = true" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')"></div>
    <Curtain @openApp="openAppHandler" @openPowerDialog="openPowerDialogHandler" />
    <OpenedApp v-if="appIsOpen" />
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
          return appIdx >= appsRow * countAppsPerRow && appIdx < countAppsPerRow * (appsRow + 1)
        })" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', { processId: app.processId, name: app.name })" @mouseup="holdApp($event, 'up', { processId: app.processId, name: app.name })" class="app">
        </div>
      </div>

    </div>
    <AppsList v-if="isAppsList" :apps="apps" :countAppsRows="countAppsRows" :countAppsPerRow="countAppsPerRow" @openApp="openAppHandler" @holdApp="holdApp" />
    <OpenedApps v-if="isOpenedApps" :openedAppItems="openedApps" @openApp="openAppHandler" @closeApp="closeAppHandler" />
    <ContextMenu v-if="isContextMenu" :origin="originContextMenu" :appInfo="appInfoContextMenu" @closeContextMenu="closeContextMenuHandler" />
    <SystemBtns @handleUndoBtn="handleUndoBtnHandler" @handleHomeBtn="handleHomeBtnHandler" @handeOpenedAppsBtn="handeOpenedAppsBtnHandler" />
    <Lock v-if="!isUnlock" @unlock="unlockHandler" />
    <PowerDialog v-if="isPowerDialog" @closePowerDialog="closePowerDialogHandler" />
    <SleepMode v-if="isSleep" />
    <Speakers :source="activeSound" :startPlay="isStartPlay"  :soundCommand="activeSoundCommand" :isSpeakersDialog="isSpeakersDialog" @resetSpeakers="resetSpeakersHandler" />
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
      countAppsPerRow: 4
    }
  },
  mounted() {
    
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
      console.log('json: ', JSON.parse(result).apps)
    });

    window.addEventListener('keydown', (event) => {
      let tempActiveKey = event.key
      this.activeKey = event.key
      setTimeout(() => {
        if(this.activeKey === tempActiveKey) {
          if(this.activeKey === 'q') {
            this.isPowerDialog = true
          }
          return
        }
      }, 3000)
    })
    window.addEventListener('keyup', (event) => {
      if(event.key === 'q') {
        this.isSleep = !this.isSleep
        this.isUnlock = false
      } else if(event.key === '+') {
        this.activeSoundCommand = 'volume turn up'
        this.activeSound = '../../sounds/volumeturn.wav'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      } else if(event.key === '-') {
        this.activeSoundCommand = 'volume turn down'
        this.activeSound = '../../sounds/volumeturn.wav'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      }
      this.activeKey = ''
    })
  },
  methods: {
    closeContextMenuHandler() {
      this.isContextMenu = false
    },
    openPowerDialogHandler() {
      this.isPowerDialog = true
    },
    holdApp(event, gesture, appInfo) {
      console.log(`holdApp: gesture: ${gesture}`)
      if(gesture === 'down') {
        setTimeout(() => {
          this.appSelected = true
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
      let  openedAppsIds = []
      if(this.openedApps.length >= 1) {
        openedAppsIds = this.openedApps.flatMap(openedApp => openedApp.processId)
      }
      let appAlreadyRunning = openedAppsIds.includes(appInfo.processId)
      this.appIsOpen = true
      this.isOpenedApps = false
      if(!appAlreadyRunning || this.openedApps.length <= 0) {
        this.openedApps.push({
          processId: appInfo.processId,
          name: appInfo.name
        })
        // this.openedApps.map(openedApp => {
        //   console.log(`openedApp: ${openedApp.name}; ${openedApp.processId}`)
        // })
      }
    },
    handleUndoBtnHandler(){
      if(!this.appIsOpen)
      this.isAppsList = false
      this.isOpenedApps = false
    },
    handleHomeBtnHandler(){
      this.isAppsList = false
      this.appIsOpen = false
      this.isOpenedApps = false
    },
    handeOpenedAppsBtnHandler() {
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