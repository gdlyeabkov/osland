<template>
    <div class="curtain" ref="curtain" @mousedown="handleGeture($event, 'down')" @mousemove="handleGeture($event, 'move')" @mouseup="handleGeture($event, 'up')">
        <div class="curtainHeader" @click="handleCurtain = false">
            <div class="curtainItem">
                <span class="curtainItemIcon">
                    {{ currentTime }}
                </span>
                <span class="material-icons curtainItemIcon">
                    fiber_manual_record
                </span>
                <span class="material-icons curtainItemIcon">
                    fiber_manual_record
                </span>
                <span class="material-icons curtainItemIcon">
                    fiber_manual_record
                </span>
            </div>
            <div class="curtainItem">
                <span class="material-icons curtainItemIcon">
                    wifi
                </span>
                <span class="material-icons curtainItemIcon">
                    lte_mobiledata
                </span>
                <span class="material-icons curtainItemIcon">
                    signal_cellular_alt
                </span>
                <span class="material-icons curtainItemIcon">
                    battery_full
                </span>
            </div>
        </div>
        <div class="curtainBodyHeader" @click="handleCurtain = false">
            <div class="curtainItem">
                <span class="material-icons curtainItemIcon" @click="openApp({
                    processId: Math.floor(Math.random() * 5000),
                    name: 'Settings'
                })" id="curtainBtn">
                    settings
                </span>
                <span class="material-icons curtainItemIcon">
                    search
                </span>
            </div>
            <div class="curtainItem">
                <span class="material-icons curtainItemIcon" @click="openPowerDialog()" id="curtainBtn">
                    power_settings_new
                </span>
                <span class="material-icons curtainItemIcon">
                    settings
                </span>
            </div>
        </div>
        <div class="curtainBody" @click="handleCurtain = false">
        
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentTime: `${new Date().toLocaleTimeString().split(':')[0]}:${new Date().toLocaleTimeString().split(':')[1]}`,
            handleCurtain: false,
            batteryLevel: 1
        }
    },
    emits: [
        'openApp'
    ],
    mounted() {
        navigator.getBattery().then(battery => {
            this.batteryLevel = battery.level
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
            navigator.getBattery().then(battery => {
                this.batteryLevel = battery.level
            })  
        }, 60000)
    },
    methods: {
        openPowerDialog() {
            this.$refs.curtain.style = `
                height: 50px;
                z-index: 10;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
            `
            this.$emit('openPowerDialog')
        },
        openApp(appInfo){
            this.$refs.curtain.style = `
                height: 50px;
                z-index: 10;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
            `
            this.handleCurtain = false
            this.$emit('openApp', appInfo)
        },
        handleGeture(event, gesture){
            if(event.target.id !== 'curtainBtn') {
                if (gesture === 'down') {
                    this.handleCurtain = true
                    this.$refs.curtain.style = `
                        z-index: 10;
                        height: 50px;
                        width: 100%;
                        background-color: rgba(0, 0, 0, 1);
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                    `
                } else if (gesture === 'move') {
                    if (this.handleCurtain) {
                        let opacityAnimation = window.screen.availHeight / 100 * this.$refs.curtain.getBoundingClientRect().bottom / 4500
                        this.$refs.curtain.style = `
                            z-index: 10;
                            height: ${50 + event.y}px;
                            width: 100%;
                            background-color: rgba(0, 0, 0, ${opacityAnimation});
                            display: flex;
                            flex-direction: column;
                            box-sizing: border-box;
                            padding: 0px 15px;
                            position: fixed;
                            top: 0px;
                            left: 0px;
                        `
                    }
                } else if (gesture === 'up') {
                    this.handleCurtain = false
                    let halfHeightOfScreen = window.screen.availHeight / 2
                    let greatherThanHalfOfScreen = this.$refs.curtain.getBoundingClientRect().bottom >= halfHeightOfScreen
                    if(greatherThanHalfOfScreen) {
                        this.$refs.curtain.style = `
                            height: 100%;
                            z-index: 10;
                            width: 100%;
                            background-color: rgba(0, 0, 0, 1);
                            display: flex;
                            flex-direction: column;
                            box-sizing: border-box;
                            padding: 0px 15px;
                            position: fixed;
                            top: 0px;
                            left: 0px;
                        `
                    } else {
                        this.$refs.curtain.style = `
                            height: 50px;
                            z-index: 10;
                            width: 100%;
                            background-color: rgba(0, 0, 0, 0.4);
                            display: flex;
                            flex-direction: column;
                            box-sizing: border-box;
                            padding: 0px 15px;
                            position: fixed;
                            top: 0px;
                            left: 0px;
                        `
                    }
                }
            }
        }
    }
}
</script>