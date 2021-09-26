<template>
  <div>
    <div class="wallpapers" ref="wallpapers"></div>
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
    
    <!-- <AppsList /> -->
    <SystemBtns />
  </div>
  
</template>

<script>
import AppsList from '@/components/AppsList.vue'
import SystemBtns from '@/components/SystemBtns.vue'

export default {
  name: 'MainActivity',
  data(){
    return {
      apps: [

      ]
    }
  },
  methods: {
    
  },
  components: {
    AppsList,
    SystemBtns
  }
}
</script>
