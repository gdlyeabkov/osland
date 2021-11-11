<template>
  <div>
    <div class="desktop" ref="desktop" @click="dragDesktop($event)"></div>
    <div class="appsList">
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
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'AppsList',
  data(){
    return {
      
    }
  },
  emits: [
    'openApp'
  ],
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
      this.$emit('openApp', { processId: Math.floor(Math.random() * 5000), })
    }
  }
}
</script>