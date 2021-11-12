<template>
  <div>
    <div class="desktop" ref="desktop" @click="dragDesktop($event)"></div>
    <div class="appListWithSearch">
      <div class="input-group searchWrap">
        <input v-model="keywords" placeholder="Поиск" type="text" class="form-control search" />
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
            return appsRowIdx < countAppsRows && (appsColumn !== (Math.floor(apps.length / (countAppsPerRow * countAppsRows))) || (appsColumn === (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) && (apps.length - (apps.length - countAppsPerRow * countAppsRows) * (Math.floor(apps.length / (countAppsPerRow * countAppsRows)))) + appsRowIdx * countAppsPerRow < apps.length)
          })" :key="appsRow" class="appRow">
            <div v-for="app in apps.filter((app, appIdx) => {
              return appIdx >= (appsRow - 1) * countAppsPerRow && appIdx < appsRow * countAppsPerRow
            })" :key="app._id" @click="openApp({ name: app.name, processId: app.processId })" @mousedown="holdApp($event, 'down', { processId: app.processId, name: app.name })" @mouseup="holdApp($event, 'up', { processId: app.processId, name: app.name })" class="app">
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
    // console.log(`debug: ${this.apps.length - (this.apps.length - this.countAppsPerRow * this.countAppsRows) * (Math.floor(this.apps.length / (this.countAppsPerRow * this.countAppsRows)))}`)
    console.log(`debug1: ${((Math.floor(this.apps.length / (this.countAppsPerRow * this.countAppsRows))))}`)
    console.log(`debug2: ${(this.apps.length - (this.apps.length - this.countAppsPerRow * this.countAppsRows) * (Math.floor(this.apps.length / (this.countAppsPerRow * this.countAppsRows))))}`)
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