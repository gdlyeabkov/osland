<template>
  <div>
    <div v-if="appIsOpen" class="openedApp"></div>
    <div class="desktop" ref="desktop" @click="dragDesktop($event)"></div>
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
</template>

<script>
export default {
  name: 'AppsList',
  data(){
    return {
      appIsOpen: false
    }
  },
  methods: {
    dragDesktop(event){
      // this.$refs.desktop.style = `
      //   top: ${event.y}px;
      //   left: ${event.y}px;
      // `
      console.log(`event: ${event}`)
      this.$refs.desktop.scrollLeft = 15
    },
    openApp(){
      console.log("открываю приложение")
      this.appIsOpen = true
    }
  }
}
</script>

<style>

</style>