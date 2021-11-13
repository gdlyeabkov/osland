<template>
  <div>
    <div class="desktop" ref="desktop" @click="dragDesktop($event)"></div>
    <div class="appListWithSearch">
      <div class="input-group searchWrap">
        <input @focus="$emit('isSearch', true)" @blur="$emit('isSearch', false)" v-model="keywords" placeholder="Поиск" type="text" class="form-control search" />
        <span @click="keywords = ''" class="input-group-text material-icons searchCloseBtn">
          close
        </span>
      </div>
      <div class="appsList">
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
          })" :key="appsColumn" class="appColumn">
          <div v-for="appsRow in apps.flatMap((app, appIndex) => appIndex).filter((appsRow, appsRowIdx) => {
            return appsRowIdx < countAppsRows && (appsColumn !== (Math.ceil(apps.length / (countAppsPerRow * countAppsRows))) || (appsColumn === (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) && (apps.length - (apps.length - countAppsPerRow * countAppsRows) * (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) + appsRowIdx * countAppsPerRow < apps.length)
          })" :key="appsRow" class="appRow" :style="`width: calc(25% * ${4});`">
            <div v-for="app in apps.filter((app, appIdx) => {
                return (appIdx >= appsRow * countAppsPerRow && appIdx < (appsRow + 1) * countAppsPerRow)
              }).filter((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 16)) : 0)] !== undefined).map((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 12) + countAppsPerRow) : 0)]).filter(app => app.name.includes(keywords))" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', app)" @mousemove="holdApp($event, 'move', app)" @mouseup="holdApp($event, 'up', app)" class="app">
            </div>
          </div>
        </div>
        <div v-if="apps.filter((app, appIdx) => {
          return (appIdx >= appsRow * countAppsPerRow && appIdx < (appsRow + 1) * countAppsPerRow)
        }).filter((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 16)) : 0)] !== undefined).map((needApp, needAppIdx) => apps[(needAppIdx + countAppsPerRow * (appsRow + 1) - 4) + (appsColumn !== 0 ? (((appsColumn) * 12) + countAppsPerRow) : 0)]).filter(app => app.name.includes(keywords)).length <= 0">
          <span class="notFoundApps">
            Нет таких приложений
          </span>
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
  props: [
    'apps',
    'countAppsRows',
    'countAppsPerRow'
  ],
  emits: [
    'openApp',
    'holdApp'
  ],
  mounted() {
    
  },
  methods: {
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

</style>