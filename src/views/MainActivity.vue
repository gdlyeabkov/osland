<template>
  <div>
    <div class="wallpapers" ref="wallpapers" @dblclick="isAppsList = true" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')"></div>
    <Curtain />
    <OpenedApp v-if="appIsOpen" />
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
    
    <AppsList v-if="isAppsList" @openApp="openAppHandler" />
    <OpenedApps v-if="isOpenedApps" :openedAppItems="openedApps" @openApp="openAppHandler" @closeApp="closeAppHandler" />
    <SystemBtns @handleUndoBtn="handleUndoBtnHandler" @handleHomeBtn="handleHomeBtnHandler" @handeOpenedAppsBtn="handeOpenedAppsBtnHandler" />
  </div>
  
</template>

<script>
import AppsList from '@/components/AppsList.vue'
import SystemBtns from '@/components/SystemBtns.vue'
import Curtain from '@/components/Curtain.vue'
import OpenedApp from '@/components/OpenedApp.vue'
import OpenedApps from '@/components/OpenedApps.vue'

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
      handleWallpapers: false
    }
  },
  methods: {
    handleGesture(event, gesture){
      console.log(`walpapers: ${gesture}`)
      if(gesture === 'down') {
        this.handleWallpapers = true
      } else if(gesture === 'move') {
        if(this.handleWallpapers) {
          this.$refs.wallpapers.scroll(event.x, 0)
        }
      } else if(gesture === 'up') {
        this.handleWallpapers = false
      }
    },
    closeAppHandler(appInfo){
      console.log(`closeAppHandler: ${Object.keys(appInfo)}; ${Object.values(appInfo)};`)
      this.openedApps = this.openedApps.filter(openedApp => {
        return openedApp.processId !== appInfo.processId
      })
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
          name: 'XXXX'
        })
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
    OpenedApps
  }
}
</script>