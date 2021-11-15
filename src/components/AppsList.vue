<template>
  <div @click="resetDisplayTimeout()">
    <div class="desktop" ref="desktop" @click="dragDesktop($event); $emit('closeContextMenu')" :style="`${orientation ? 'width: 50%;' : ''}`">
    </div>
    <div class="appListWithSearch" :style="`${orientation ? 'width: 200%;' : ''}`" @click="$emit('closeContextMenu')">
      <div class="input-group searchWrap" :style="`${orientation ? 'width: 35%;' : ''}`">
        <input @focus="$emit('isSearch', true)" @blur="$emit('isSearch', false)" v-model="keywords" :placeholder="
          settings.general.language === 'Русский' ?
            'Поиск'
          : settings.general.language === 'English' ?
            'Search'
          :
            'Поиск'
        " type="text" class="form-control search" />
        <span @click="keywords = ''" class="input-group-text material-icons searchCloseBtn">
          close
        </span>
      </div>
      <div class="appsList" :style="`${orientation ? 'width: 100%; overflow-x: scroll;' : ''}`">
        <!-- <div class="appColumn">
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
        </div>
        <div class="appColumn">
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
        </div>
        <div class="appColumn">
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
        </div> -->
        <div v-for="appsColumn in apps.flatMap((app, appIndex) => appIndex).filter((appsColumn, appsColumnIdx) => {
            return appsColumnIdx <= Math.floor(apps.length / (countAppsPerRow * countAppsRows))
          })" :key="appsColumn" class="appColumn" :style="`width: 100%;`">
          <div v-for="appsRow in apps.flatMap((app, appIndex) => appIndex).filter((appsRow, appsRowIdx) => {
            return appsRowIdx < countAppsRows && (appsColumn !== (Math.ceil(apps.length / (countAppsPerRow * countAppsRows))) || (appsColumn === (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) && (apps.length - (apps.length - countAppsPerRow * countAppsRows) * (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) + appsRowIdx * countAppsPerRow < apps.length)
          })" :key="appsRow" class="appRow" :style="`width: calc(25% * ${apps.filter((app, appIdx) => {
                return (appIdx >= appsRow * countAppsPerRow && appIdx < (appsRow + 1) * countAppsPerRow)
              }).filter((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 16)) : 0)] !== undefined).map((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 12) + countAppsPerRow) : 0)]).filter(app => app.name.includes(keywords)).length});`">
            <div v-for="app in apps.filter((app, appIdx) => {
                return (appIdx >= appsRow * countAppsPerRow && appIdx < (appsRow + 1) * countAppsPerRow)
              }).filter((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 16)) : 0)] !== undefined).map((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 12) + countAppsPerRow) : 0)]).filter(app => app.name.includes(keywords))" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', app)" @mousemove="holdApp($event, 'move', app)" @mouseup="holdApp($event, 'up', app)" class="app">
            </div>
            <div class="notFoundAppsContainer" v-if="apps.every((app, appIdx) => {
              return !app.name.includes(keywords)
            })">
              <span class="notFoundApps">
                Нет таких приложений
              </span>
            </div>
          </div>
        </div>
        <!-- <div class="appColumn">
          <div class="appRow">
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
            <div @click="openApp()" class="app">
            </div>
          </div>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppsList',
  data(){
    return {
      keywords: ''
    }
  },
  props: {
    'apps': {

    },
    'countAppsRows': {

    },
    'countAppsPerRow': {

    },
    'orientation': {

    },
    'settings': {
      default: {
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
    }
  },
  emits: [
    'openApp',
    'holdApp',
    'resetDisplayTimeout'
  ],
  mounted() {
    
  },
  methods: {
    resetDisplayTimeout() {
      this.$emit('resetDisplayTimeout')
    },
    holdApp(event, gesture, appInfo) {
      this.$emit('holdApp', event, gesture, appInfo)
    },
    dragDesktop(event){
      // this.$refs.desktop.style = `
      //   top: ${event.y}px;
      //   left: ${event.y}px;
      // `
      console.log(`event: ${event}`)
      this.$refs.desktop.scrollLeft = 15
    },
    openApp(){
      this.$emit('openApp', { processId: Math.floor(Math.random() * 5000), })
    }
  },
  components: {
    
  }
}
</script>
<style scoped>
  .appRow:first-child:nth-last-child(1),
  .appRow:first-child:nth-last-child(1) {
    width: 25%;
  }
  .appRow:first-child:nth-last-child(2),
  .appRow:first-child:nth-last-child(2) {
    width: 50%;
  }
  .appRow:first-child:nth-last-child(3),
  .appRow:first-child:nth-last-child(3) {
    width: 75%;
  }
  .appRow:first-child:nth-last-child(4),
  .appRow:first-child:nth-last-child(4) {
    width: 100%;
  }

  .notFoundAppsContainer {
    position: fixed;
    top: 35%;
    left: 35%;
  }

</style>