<template>
    <div class="openedApps" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')" ref="openedApps">
        <OpenedAppsItem @closeApp="closeAppHandler" :appInfo="openedAppItem" v-for="openedAppItem in  openedAppItems" :key="openedAppItem.processId" @openApp="openAppHandler" />
    </div>
</template>

<script>
import OpenedAppsItem from '@/components/OpenedAppsItem.vue'
export default {
    name: 'OpenedApps',
    props: [
        'openedAppItems'
    ],
    emits: [
        'openApp',
        'closeApp'
    ],
    data() {
        return {
            handleOpenedApps: false
        }
    },
    methods: {
        closeAppHandler(appInfo){
            this.$emit('closeApp', appInfo)
        },
        openAppHandler(appInfo){
            console.log(`appInfo: ${Object.keys(appInfo)}; ${Object.values(appInfo)};`)
            this.$emit('openApp', appInfo)
        },
        handleGesture(event, gesture){
            if(gesture === 'down') {
                this.handleOpenedApps = true
            } else if(gesture === 'move') {
                if(this.handleOpenedApps) {
                    this.$refs.openedApps.scroll(event.x, 0)
                }
            } else if(gesture === 'up') {
                this.handleOpenedApps = false
            }
        }
    },
    components: {
        OpenedAppsItem
    }
}
</script>