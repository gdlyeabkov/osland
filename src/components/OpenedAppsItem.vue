<template>
    <div @click="openApp(appInfo)" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')" ref="openedAppsItem" class="openedAppsItem">

    </div>
</template>

<script>
export default {
    name: 'OpenedAppsItem',
    props: [
        'appInfo'
    ],
    data() {
        return {
            handleOpenedAppsItem: false
        }
    },
    emits: [
        'openApp',
        'closeApp'
    ],
    methods: {
        handleGesture(event, gesture){
            if(gesture === 'down') {
                this.handleOpenedAppsItem = true
            } else if(gesture === 'move') {
                if(this.handleOpenedAppsItem) {
                   this.$refs.openedAppsItem.style = `
                        position: relative;
                        top: ${event.y - 375}px;
                        left: 0px;
                        border-radius: 8px;
                        min-width: 350px;
                        height: 500px;
                        background-color: rgb(255, 255, 255);
                        margin: 0px 25px;
                    `
                }
            } else if(gesture === 'up') {
                this.handleOpenedAppsItem = false
                let lessThanHalfOfTop = this.$refs.openedAppsItem.getBoundingClientRect().top <= 0
                if(lessThanHalfOfTop) {
                    this.$refs.openedAppsItem.style = `
                        display: none;
                        position: relative;
                        top: 0px;
                        left: 0px;
                        border-radius: 8px;
                        min-width: 350px;
                        height: 500px;
                        background-color: rgb(255, 255, 255);
                        margin: 0px 25px;
                    `
                    this.$emit('closeApp', this.appInfo)
                } else {
                    this.$refs.openedAppsItem.style = `
                        position: relative;
                        top: 0px;
                        left: 0px;
                        border-radius: 8px;
                        min-width: 350px;
                        height: 500px;
                        background-color: rgb(255, 255, 255);
                        margin: 0px 25px;
                    `
                }
            }
        },
        openApp(appInfo) {
            console.log('Открываю приложение во вкладках')
            this.$emit('openApp', appInfo)
        }
    }
}
</script>