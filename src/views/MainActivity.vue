<template>
  <div :style="`width: ${orientation ? '50%' : '100%'};`">
    <DeveloperMode v-if="settings.developerParameters.enabled" :settings="settings" />
    <div v-if="isUnlock" class="wallpapers" ref="wallpapers" @dblclick="isAppsList = true" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')" :style="`width: ${orientation ? '50%' : '100%'}; background-size: cover; background-image: url(${settings.wallpapers.mainScreen}); -webkit-filter: ${settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'}; ${ settings.developerParameters.flipInterface ? 'transform: scaleX(-1);' : ''}`"></div>
    <Curtain :currentTime="currentTime" :batteryLevel="batteryLevel" :soundMode="currentSoundMode" :settings="settings" :location="location" :wifiSetter="wifiSetter" :bluetoothSetter="bluetoothSetter" :airplaneModeSetter="airplaneModeSetter" :locationSetter="locationSetter" :topicSetter="topicSetter" :autoSyncSetter="autoSyncSetter" :brightnessSetter="brightnessSetter" :mobileDataSetter="mobileDataSetter" @openSearch="openSearchHandler" @openApp="openAppHandler" @openPowerDialog="openPowerDialogHandler" @changeBrightness="changeBrightnessHandler" @changeOrientation="changeOrientationHandler" @filterBlueColor="filterBlueColorHandler" @closeContextMenu="closeContextMenuHandler" @changeVolume="changeVolumeHandler" @resetDisplayTimeout="clearDisplayTimeout" @transferSoundMode="transferSoundModeHandler" @setWifi="setWifiHandler" @setBluetooth="setBluetoothHandler" @setAirplaneMode="setAirplaneModeHandler" @setLocation="setLocationHandler" @setAutoSync="setAutoSyncHandler" @setMobileData="setMobileDataHandler" @surfaceUpdate="surfaceUpdate()" />
    <OpenedApp v-if="appIsOpen" :appInfo="appInfo" :launchTime="launchTime" :soundMode="currentSoundMode" :brightness="brightness" :orientation="orientation" :batteryLevel="batteryLevel" :batteryCharging="batteryCharging" :batteryDischarging="batteryDischarging" :isUndo="oneUndo" :apps="apps" :wifiSetter="wifiSetter" :bluetoothSetter="bluetoothSetter" :airplaneModeSetter="airplaneModeSetter" :locationSetter="locationSetter" :autoSyncSetter="autoSyncSetter" :brightnessSetter="brightnessSetter" :mobileDataSetter="mobileDataSetter" @transferSoundMode="transferSoundModeHandler"  @changeBrightness="changeBrightnessHandler" @setLocation="setLocationHandler" @setTopic="setTopicHandler" @resetDisplayTimeout="clearDisplayTimeout" @undoEnded="undoEndedHandler" @setWifi="setWifiHandler" @setBluetooth="setBluetoothHandler" @setAirplaneMode="setAirplaneModeHandler" @setAutoSync="setAutoSyncHandler" @setSoundVolume="setSoundVolumeHandler" @refreshDisplayTimeout="refreshDisplayTimeoutHandler" @setMobileData="setMobileDataHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
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
        })" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', app)" @mouseup="holdApp($event, 'up', app)" :class="{ app: true, griddable: settings.developerParameters.showGridElements }" :style="`background-image: url('http://localhost:4000/api/apps/favicons/get/?appname=${app.name}.png'); border-radius: ${settings.topic === 'light' ? '5' : '25' }px;`">
        </div>
      </div>

    </div>
    <AppsList v-if="isAppsList && settings.display.mainScreen.layout" :apps="apps" :countAppsRows="settings.display.appsScreen.grid.rows" :countAppsPerRow="settings.display.appsScreen.grid.cols" :orientation="orientation" :settings="settings" @openApp="openAppHandler" @holdApp="holdApp" @isSearch="isSearchHandler" @closeContextMenu="closeContextMenuHandler" @resetDisplayTimeout="clearDisplayTimeout" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <OpenedApps v-if="isOpenedApps" :openedAppItems="openedApps" @openApp="openAppHandler" @closeApp="closeAppHandler" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <ContextMenu v-if="isContextMenu" :origin="originContextMenu" :appInfo="appInfoContextMenu" :isAppsList="isAppsList" @closeContextMenu="closeContextMenuHandler" :settings="settings" @changeAppShortcut="changeAppShortcutHandler" @deleteApp="deleteAppHandler" />
    <SystemBtns :settings="settings" @handleUndoBtn="handleUndoBtnHandler" @handleHomeBtn="handleHomeBtnHandler" @handeOpenedAppsBtn="handeOpenedAppsBtnHandler" @resetDisplayTimeout="clearDisplayTimeout" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <Lock v-if="!isUnlock" :currentTime="currentTime" :settings="settings" @unlock="unlockHandler" @resetDisplayTimeout="clearDisplayTimeout" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <PowerDialog v-if="isPowerDialog" :settings="settings" @closePowerDialog="closePowerDialogHandler" @resetDisplayTimeout="clearDisplayTimeout" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <SleepMode v-if="isSleep" :style="`width: ${orientation ? '50%' : '100%'};`" />
    <Speakers :source="activeSound" :startPlay="isStartPlay"  :soundCommand="activeSoundCommand" :isSpeakersDialog="isSpeakersDialog" :changeVolume="changeVolumeHandler" :soundMode="currentSoundMode" @resetSpeakers="resetSpeakersHandler" @transferSoundMode="transferSoundModeHandler" />
    <VKeyboard v-if="virtualKeyboard" />
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
import VKeyboard from '@/components/VKeyboard.vue'
import DeveloperMode from '@/components/DeveloperMode.vue'

import speak from "offline-tts"

const systemInformation = require('nodejs-system-info')
// const osu = require('node-os-utils')

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
      batteryCharging: false,
      batteryDischarging: 0,
      isSearch: false,
      currentSoundMode: 0,
      orientation: false,
      settings: {
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
          language: 'Русский',
          dateAndTime: {
            fullHoursFormat: true
          }
        },
        deviceUsabilityAndParentControl: {
          displayTimeout: 60
        },
        deviceManagement: {
          cpu: 0,
          drive: 0,
          memory: 0
        },
        display: {
          fontSize: 0,
          displayTimeout: 60,
          navigation: {
            type: 'buttons',
            buttonsOrder: 'left'
          },
          screenScale: 100
        },
        notifications: {
          enabled: true,
          main: {
            showNotificationsIcons: true,
            options: 'last'
          },
          showBatteryPercents: false
        },
        updates: {
          lastCheck: new Date().toLocaleString(),
          lastUpdate: new Date().toLocaleString()
        },
        developerParameters: {
          enabled: false,
          touchPlace: false,
          showTouches: false,
          showGridElements: false
        }
      },
      launchTime: '00.00.00, 00:00:00',
      brightness: 100,
      location: 0,
      trySleep: [],
      oneUndo: false,
      virtualKeyboard: false,
      wifiSetter: false,
      bluetoothSetter: false,
      airplaneModeSetter: false,
      locationSetter: false,
      topicSetter: 'dark',
      autoSyncSetter: false,
      brightnessSetter: 100,
      mobileDataSetter: false,
      surfaceUpdateInteval: 100
    }
  },
  mounted() {
    
    // if(localStorage.getItem('osland_settings') === null) {
    //   localStorage.setItem('osland_settings', JSON.stringify({
    //     'lockScreen': {
    //       'mode': 'moveSlide'
    //     }
    //   }))
    // }
    // this.settings = JSON.parse(localStorage.getItem('osland_settings'))
    // console.log(`settings: ${Object.keys(this.settings)}; ${Object.values(this.settings)}`)
    this.uploadApps()

    window.addEventListener('keydown', (event) => {
      
      this.clearDisplayTimeout()
      
      let tempActiveKey = event.key
      this.activeKey = event.key
      setTimeout(() => {
        if(this.activeKey === tempActiveKey) {
          if(this.activeKey === 'q' && !this.isSearch) {
            this.surfaceUpdate()
            this.isPowerDialog = true
          }
          return
        }
      }, 3000)
    })
    window.addEventListener('keyup', (event) => {
      if(event.key === 'q' && !this.isSearch && !this.isPowerDialog) {
        this.isSleep = !this.isSleep
        this.isUnlock = false
        if(!this.isSleep) {
          this.setDisplayTimeout()
        } else if (this.isSleep) {
          this.isAppsList = false
          this.isPowerDialog = false
        }
      } else if(event.key === '+') {
        this.activeSoundCommand = 'volume turn up'
        this.activeSound = '../../sounds/volumeturn.wav'
        // this.activeSound = '../../sounds/krik.mp3'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      } else if(event.key === '-') {
        this.activeSoundCommand = 'volume turn down'
        this.activeSound = '../../sounds/volumeturn.wav'
        // this.activeSound = '../../sounds/krik.mp3'
        this.isStartPlay = true
        this.isSpeakersDialog = true
      }
      this.activeKey = ''
    })

    navigator.getBattery().then(battery => {
      // this.battery = battery
      this.batteryLevel = battery.level
      this.batteryCharging = battery.charging
      this.batteryDischarging = battery.dischargingTime
      // console.log(`battery: ${Object.keys(this.battery)}`)
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
      // navigator.getBattery().then(battery => {
        // this.battery = battery
        // console.log(`battery: ${Object.keys(battery)}`)
      // })  
    }, 60000)

    this.launchTime = new Date().toLocaleString()

    window.addEventListener('touchstart', (event) => {
      console.log(`touchstart: ${event}`)
    })
    window.addEventListener('touchmove', (event) => {
      console.log(`touchmove: ${event}`)
    })
    window.addEventListener('touchend', (event) => {
      console.log(`touchend: ${event}`)
    })

    this.countAppsPerRow = this.settings.display.mainScreen.grid.cols
    this.countAppsRows = this.settings.display.mainScreen.grid.rows

  },
  methods: {
    refreshDisplayTimeoutHandler(timeout) {
      this.settings.deviceUsabilityAndParentControl.displayTimeout = timeout
      this.setDisplayTimeout()
    },
    surfaceUpdate() {
      if(this.settings.developerParameters.showSurfaceUpdate) {
        this.$refs.wallpapers.style = `
          -webkit-filter: none;
        `
        setTimeout(() => {
          this.$refs.wallpapers.style = `
            -webkit-filter: sepia(100%) hue-rotate(270deg) saturate(400%);
          `
          setTimeout(() => {
            this.$refs.wallpapers.style = `
              -webkit-filter: none;
            `
            setTimeout(() => {
              this.$refs.wallpapers.style = `
                -webkit-filter: sepia(100%) hue-rotate(270deg) saturate(400%);
              `
              setTimeout(() => {
                this.$refs.wallpapers.style = `
                  -webkit-filter: none;
                `
                setTimeout(() => {
                  this.$refs.wallpapers.style = `
                    -webkit-filter: sepia(100%) hue-rotate(270deg) saturate(400%);
                  `
                  setTimeout(() => {
                    this.$refs.wallpapers.style = `
                      -webkit-filter: none;
                    `
                    setTimeout(() => {
                      this.$refs.wallpapers.style = `
                        -webkit-filter: sepia(100%) hue-rotate(270deg) saturate(400%);
                      `
                      setTimeout(() => {
                        this.$refs.wallpapers.style = `
                          -webkit-filter: none;
                        `
                        setTimeout(() => {
                          this.$refs.wallpapers.style = `
                            -webkit-filter: sepia(100%) hue-rotate(270deg) saturate(400%);
                          `
                          setTimeout(() => {
                            this.$refs.wallpapers.style = `
                              -webkit-filter: none;
                            `
                          }, this.surfaceUpdateInteval)  
                        }, this.surfaceUpdateInteval)
                      }, this.surfaceUpdateInteval)
                    }, this.surfaceUpdateInteval)
                  }, this.surfaceUpdateInteval)
                }, this.surfaceUpdateInteval)
              }, this.surfaceUpdateInteval)
            }, this.surfaceUpdateInteval)
          }, this.surfaceUpdateInteval)
        }, this.surfaceUpdateInteval)
      }
    },
    setSoundVolumeHandler(volume) {
      this.currentSoundMode = volume
      console.log(`setSoundVolumeHandler: ${volume}`)
    },
    setMobileDataHandler(isEnabled) {
      console.log(`setMobileDataHandler: ${isEnabled}`)
      this.mobileDataSetter = isEnabled
    },
    setAutoSyncHandler(isEnabled) {
      console.log(`setAutoSyncHandler: ${isEnabled}`)
      this.autoSyncSetter = isEnabled
    },
    setTopicHandler(topic) {
      console.log(`setTopicHandler: ${topic}`)
      this.topicSetter = topic
      this.settings.topic = topic
    },
    setLocationHandler(isEnabled) {
      console.log(`setLocationHandler: ${isEnabled}`)
      this.locationSetter = isEnabled
    },
    setAirplaneModeHandler(isEnabled) {
      console.log(`setAirplaneModeHandler: ${isEnabled}`)
      this.airplaneModeSetter = isEnabled
    },
    setBluetoothHandler(isEnabled) {
      console.log(`setBluetoothHandler: ${isEnabled}`)
      this.bluetoothSetter = isEnabled
    },
    setWifiHandler(isEnabled) {
      console.log(`setWifiHandler: ${isEnabled}`)
      this.wifiSetter = isEnabled
    },
    undoEndedHandler(isQuit) {
      this.oneUndo = false
      if(isQuit) {
        this.appIsOpen = false
      }
    },
    clearDisplayTimeout() {
      this.trySleep.map(trySleep => {
        clearTimeout(trySleep)
      })
      this.setDisplayTimeout()
    },
    setDisplayTimeout() {
      this.trySleep.push(setTimeout(() => {
          if(!this.settings.developerParameters.notDisableDisplay) {
            if(this.settings.developerParameters.removeActivityAfterExit) {
              this.openedApps = []
            }
            this.isSleep = true
            this.isAppsList = false
          }
      }, this.settings.deviceUsabilityAndParentControl.displayTimeout * 1000))
    },
    changeVolumeHandler(volume) {
      console.log(`changeVolumeHandler: ${volume}`)
      return volume
    },
    handlePermission() {
      navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state == 'granted') {
          console.log(result.state);
        } else if (result.state == 'prompt') {
          console.log(result.state);
        } else if (result.state == 'denied') {
          console.log(result.state);
        }
        result.onchange = function() {
          report(result.state);
        }
      });
    },
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
      this.virtualKeyboard = isSearch
      
    },
    changeBrightnessHandler(brightnessPercent) {
      console.log('changeBrightnessHandler')
      this.$refs.wallpapers.style = `
        -webkit-filter: brightness(${brightnessPercent / 100})${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? ' grayscale(1)' : ''};
      `
      this.brightness = brightnessPercent
      this.brightnessSetter = brightnessPercent
      console.log(`this.brightness: ${this.brightness}`)
    },
    openSearchHandler() {
      this.isAppsList = true
    },
    closeContextMenuHandler() {
      this.isContextMenu = false
    },
    openPowerDialogHandler() {
      this.surfaceUpdate()
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
            if(this.settings.specialCapabilities.voiceAssistant.enabled) {
              let ttsSpeed = Number(this.settings.general.languageAndInput.tts.speed)
              let ttsPitch = Number(this.settings.general.languageAndInput.tts.pitch)
              speak(appInfo.name, 2, ttsSpeed, 0.8, ttsPitch)
            }
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
      this.surfaceUpdate()
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
      let openedAppsIds = []
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
        if(appInfo.timer >= 1) {
          setTimeout(() => {
            alert(`Время использования приложения ${appInfo.name} истекло`)
            this.closeAppHandler(appInfo)
          }, appInfo.timer * 1000)
        }
        this.surfaceUpdate()
      }
    },
    handleUndoBtnHandler(){
      // if(!this.appIsOpen)
      this.isContextMenu = false
      this.isAppsList = false
      this.isOpenedApps = false
      this.oneUndo = true
      this.surfaceUpdate()
    },
    handleHomeBtnHandler(){
      this.isContextMenu = false
      this.isAppsList = false
      this.appIsOpen = false
      this.isOpenedApps = false
      this.surfaceUpdate()
    },
    handeOpenedAppsBtnHandler() {
      // this.appIsOpen = false
      this.isContextMenu = false
      this.isOpenedApps = !this.isOpenedApps
      this.surfaceUpdate()
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
    ContextMenu,
    VKeyboard,
    DeveloperMode
  }
}
</script>
<style scoped>
  .griddable {
    border: 3px solid rgb(0, 0, 0);
  }
</style> 