<template>
    <div class="curtain" ref="curtain" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')">
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
                <span class="material-icons curtainItemIcon curtainBtn">
                    wifi
                </span>
                <span class="material-icons curtainItemIcon curtainBtn">
                    lte_mobiledata
                </span>
                <span class="material-icons curtainItemIcon curtainBtn">
                    signal_cellular_alt
                </span>
                <span class="material-icons curtainItemIcon curtainBtn">
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
                <span @click="openSearch()" class="material-icons curtainItemIcon" id="curtainBtn">
                    search
                </span>
            </div>
            <div class="curtainItem">
                <span class="material-icons curtainItemIcon" @click="openPowerDialog()" id="curtainBtn">
                    power_settings_new
                </span>
                <span class="material-icons curtainItemIcon" id="curtainBtn">
                    more_vert
                </span>
            </div>
        </div>
        <div class="curtainBody">
            <div class="curtainBodyRow">
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    wifi
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    volume_up
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    bluetooth
                </span>
                <span @click="orientation = !orientation" class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    {{
                        orientation ?
                        'crop_portrait'
                        :
                        'crop_landscape'
                    }}
                </span>
            </div>
            <div class="curtainBodyRow">
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    flight
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    {{
                        true ?
                            'flashlight_on'
                        :
                            'flashlight_on'
                    }}
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    battery_full
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    swap_vert
                </span>
            </div>
            <div class="curtainBodyRow">
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    palette
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    tap_and_play
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn" @click="getLocation()">
                    location_on
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    qr_code
                </span>
            </div>
            <div class="curtainBodyRow">
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    play_circle_outline
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    do_not_disturb_on
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    wifi_calling
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    sync
                </span>
            </div>
        </div>
        <div class="curtainFooter">
            <div @click="changeBrightness($event)" class="brightnessControl progress" id="curtainBtn">
                <div  @click="changeBrightness($event)" ref="brightnessControlFiller" class="brightnessControlFiller progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="50" aria-valuemax="100"  id="curtainBtn">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const openGeocoder = require('node-open-geocoder')

export default {
    data(){
        return {
            handleCurtain: false,
            orientation: true
        }
    },
    props: [
        'currentTime',
        'batteryLevel'
    ],
    emits: [
        'openApp',
        'closeContextMenu',
        'changeBrightness'
    ],
    mounted() {
        
    },
    methods: {
        getLocation(){
            let destination = 'Неизветно'
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude
                    let lng = position.coords.longitude
                    openGeocoder()
                        .reverse(lng, lat)
                        .end((err, res) => {
                            destination = `${res.address.city}, ${res.address.state}, ${res.address.country}`
                            console.log(`destination: ${destination}`)
                        })
                })
            } else  {
                console.log(`destination: ${destination}`)
            }
        },
        changeBrightness(event) {
            let brightnessPercent = event.x / 14
            this.$refs.brightnessControlFiller.style = `
                background-color: rgb(100, 150, 255);
                width: ${brightnessPercent}%;
            `
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
                -webkit-filter: brightness(${brightnessPercent / 100});
            `
            this.$emit('changeBrightness', brightnessPercent)
        },
        openSearch() {
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
            this.$emit('openSearch')
        },
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
        handleGesture(event, gesture){
            this.$emit('closeContextMenu')
            if (gesture === 'down' && event.target.id !== 'curtainBtn') {
                // if (this.handleCurtain) {

                // } else if (this.handleCurtain) {

                // }
                let halfHeightOfScreen = window.screen.availHeight / 2
                let greatherThanHalfOfScreen = this.$refs.curtain.getBoundingClientRect().bottom >= halfHeightOfScreen
                if (greatherThanHalfOfScreen) {
                    this.handleCurtain = false
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
                } else {
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
                }
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
                // && event.target.id !== 'curtainBtn'
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
</script>
<style scoped>
    
    .curtainBodyRow {
        margin: 25px 0px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 150px;
    }

    .curtainBodyItem {
        /* margin: 0px 15px; */
        border-radius: 100%;
        width: 75px;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .brightnessControl {
        background-color: rgb(255, 215, 255);
    }

    .brightnessControlFiller {
        background-color: rgb(100, 150, 255);
        width: 50%;
    }

</style>