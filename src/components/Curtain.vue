<template>
    <div :style="`width: ${orientation ? '50%' : '100%'}; background-color: ${settings.topic === 'dark' ? 'rgb(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'}; -webkit-filter: ${settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};`" class="curtain" ref="curtain" @mousedown="handleGesture($event, 'down')" @mousemove="handleGesture($event, 'move')" @mouseup="handleGesture($event, 'up')">
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
                <span v-if="settings.notifications.showBatteryPercents" class="showBatteryPercents">
                    {{
                        batteryLevel * 100
                    }}%
                </span>
                <span class="material-icons curtainItemIcon curtainBtn">
                    battery_full
                </span>
            </div>
        </div>
        <div class="curtainBodyHeader" @click="handleCurtain = false">
            <div class="curtainItem">
                <span class="material-icons curtainItemIcon" @click="openApp({
                    processId: settingsProcessId,
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
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isWifi, 'btn-light': !isWifi }" id="curtainBtn" @click="isWifi = !isWifi; $emit('setWifi', isWifi)">
                    wifi
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': currentSoundMode !== 0, 'btn-light': currentSoundMode === 0 }" id="curtainBtn" @click="currentSoundMode = currentSoundMode > 0.1 ?
                            0.1
                        : currentSoundMode === 0.1 ?
                            0
                        :
                            1; $emit('transferSoundMode', currentSoundMode)">
                    {{
                        currentSoundMode > 0.1 ?
                            'volume_up'
                        : currentSoundMode === 0.1 ?
                            'volume_down'
                        :
                            'volume_off'
                    }}
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isBluetooth, 'btn-light': !isBluetooth }" id="curtainBtn" @click="isBluetooth = !isBluetooth; $emit('setBluetooth', isBluetooth)">
                    bluetooth
                </span>
                <span @click="orientation = !orientation; $emit('changeOrientation', orientation)" class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    {{
                        orientation ?
                        'crop_portrait'
                        :
                        'crop_landscape'
                    }}
                </span>
            </div>
            <div class="curtainBodyRow">
                <span :class="{curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': flightMode, 'btn-light': !flightMode }" id="curtainBtn" @click="flightMode = !flightMode; $emit('setAirplaneMode', flightMode)">
                    flight
                </span>
                <span :class="{curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isFlash, 'btn-light': !isFlash }" id="curtainBtn" @click="isFlash = !isFlash">
                    {{
                        isFlash ?
                            'flashlight_on'
                        :
                            'flashlight_off'
                    }}
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, 'btn': true, 'btn-primary': !isBatterySaverMode, 'btn-light': isBatterySaverMode }" id="curtainBtn" @click="isBatterySaverMode = !isBatterySaverMode">
                    {{
                        !isBatterySaverMode ?
                            'battery_full'
                        :
                            'battery_saver'
                    }}
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': mobileData, 'btn-light': !mobileData }" id="curtainBtn" @click="mobileData = !mobileData">
                    swap_vert
                </span>
            </div>
            <div class="curtainBodyRow">
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': blueColorFilter, 'btn-light': !blueColorFilter }" id="curtainBtn" @click="blueColorFilter = !blueColorFilter; $emit('filterBlueColor', blueColorFilter)">
                    palette
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    tap_and_play
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': geolocationId !== null && geolocationId !== undefined, 'btn-light': geolocationId === null || geolocationId === undefined }" id="curtainBtn" @click="setGeolocation()">
                    location_on
                </span>
                <span class="curtainBodyItem material-icons btn btn-primary" id="curtainBtn">
                    qr_code
                </span>
            </div>
            <div class="curtainBodyRow">
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isVideoMode, 'btn-light': !isVideoMode }" id="curtainBtn" @click="isVideoMode = !isVideoMode">
                    play_circle_outline
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isDontDisturb, 'btn-light': !isDontDisturb }" id="curtainBtn" @click="isDontDisturb = !isDontDisturb; $emit('changeVolume', 0); $emit('transferSoundMode', isDontDisturb ? 0 : 1)">
                    do_not_disturb_on
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isWifiCalling, 'btn-light': !isWifiCalling }" id="curtainBtn" @click="isWifiCalling = !isWifiCalling">
                    wifi_calling
                </span>
                <span :class="{ curtainBodyItem: true, 'material-icons': true, btn: true, 'btn-primary': isSync, 'btn-light': !isSync }" id="curtainBtn" @click="isSync = !isSync">
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

// const wifi = require('node-wifi')
// const wifi = require('wifi.js')
// const Wifi = require('wifi')
// const scanner = require('node-wifi-scanner')
// const bluetooth = require('bluetooth')
// const fs = require('fs')
// const wifiscanner = require('node-simplerwifiscanner')
// var wifi = require("windowswifi");
// const hotspot = require('node-hotspot')
// const WiFiControl = require('wifi-control')
// const wifiList = require('wifi-list-windows')

export default {
    data(){
        return {
            handleCurtain: false,
            orientation: false,
            currentSoundMode: 1,
            flightMode: false,
            isFlash: false,
            isBatterySaverMode: false,
            blueColorFilter: false,
            geolocationId: null,
            mobileData: false,
            isWifi: false,
            isBluetooth: false,
            isScanQRcode: true,
            isSync: true,
            isAccessPoint: false,
            isWifiCalling: true,
            isDontDisturb: false,
            isVideoMode: true,
            settingsProcessId: 0,
        }
    },
    props: [
        'currentTime',
        'batteryLevel',
        'soundMode',
        'settings',
        'wifiSetter',
        'bluetoothSetter',
        'airplaneModeSetter'
    ],
    emits: [
        'openApp',
        'closeContextMenu',
        'changeBrightness',
        'changeOrientation',
        'filterBlueColor',
        'changeVolume',
        'location',
        'resetDisplayTimeout',
        'transferSoundMode',
        'surfaceUpdate',
    ],
    watch: {
        soundMode(newSoundMode) {
            this.currentSoundMode = newSoundMode
        },
        async location(newLocation) {
            console.log('changeLocation')
            this.setGeolocation()
        },
        async wifiSetter(isEnabled) {
            console.log(`setWifi: ${isEnabled}`)
            this.isWifi = isEnabled
        },
        async bluetoothSetter(isEnabled) {
            console.log(`setBluetooth: ${isEnabled}`)
            this.isBluetooth = isEnabled
        },
        async airplaneModeSetter(isEnabled) {
            console.log(`setAirplaneMode: ${isEnabled}`)
            this.flightMode = isEnabled
        }
    },
    mounted() {
        // wifi.init();
        // wifi.getCurrentConnections((error, currentConnections) => {
        //     if (error) {
        //         console.log(`ошибка`)
        //     } else {
        //         console.log(`currentConnections: ${currentConnections}`)
        //     }
        // })
        
        // si.wifiNetworks((err, connections) => {
        //     if(err) {
        //         console.log(`Не могу получить подключения`)
        //         return null
        //     } else {

        //     }
        // })

        // wifi.init({
        //     iface: null
        // });
        // wifi.getCurrentConnections((error, currentConnections) => {
        //     if (error) {
        //         console.log(`ошибка`)
        //     } else {
        //         console.log(`currentConnections: ${currentConnections}`)
        //     }
        // })

        // scanner.scan((err, networks) => {
        //     if (err) {
        //         console.error(err)
        //         return
        //     }
        //     console.log(networks)
        // })

        // wifiscanner.scan(function(err, data){
        //     if (err) {
        //         console.log("Error : " + err)
        //         return
        //     }
        //     console.log(data)
        // })

        // wifi.getNetworks(function (err, networks) {
        //     if (err) throw err;
        //     console.log(networks);
        // });
        
        // var opts = {
        //     ssid: 'marshrutizator', 
        //     password: 'Joy26Beauty54'
        // }
        // hotspot.enable(opts)
        //     .then(function() {
        //         console.log('Hotspot Enabled')
        //     })
        //     .catch(function(e) {
        //         console.log('Something went wrong; Perms?', e)
        //     })
        // hotspot.disable(opts)
        //     .then(function() {
        //         console.log('Hotspot disabled')
        //     })
        //     .catch(function(e) {
        //         console.log('Something went wrong; Perms?', e)
        //     })
        // hotspot.stats(opts)
        //     .then(function(status) {
        //         console.log('Hotspot status: ' + status) //status contains clients object and state
        //     })
        
        //  Initialize wifi-control package with verbose output
        // WiFiControl.init({
        //     debug: true
        // })
        //  Try scanning for access points:
        // WiFiControl.scanForWiFi( function(err, response) {
        //     if (err) console.log(err);
        //     console.log(response);
        // })

        // wifiList(function (err, networks) {
        //     if (err) throw err
        //     console.log(networks)
        // })

        // si.bluetoothDevices((err, connections, a) => {
            // if(err) {
            //     console.log(`Не могу получить подключения`)
            //     return null
            // } else {
                // console.log(`connections: ${err}; ${connections}; ${a}`)
            // }
        // })

        // bluetooth.isOn().then(state => {
        //     console.log(state);
        // });

        this.currentSoundMode = this.soundMode

        this.settingsProcessId = Math.floor(Math.random() * 5000)

    },
    methods: {
        resetDisplayTimeout() {
            this.$emit('resetDisplayTimeout')
        },
        setGeolocation() {
            if(navigator.geolocation !== null && navigator.geolocation !== undefined) {
                if(this.geolocationId === null || this.geolocationId === undefined) {
                    this.geolocationId = navigator.geolocation.watchPosition((updatedPosition) => {
                        console.log(`updatedPosition: ${updatedPosition}`)
                    })
                    console.log(`подключаю gps`)
                } else {
                    navigator.geolocation.clearWatch(this.geolocationId)
                    this.geolocationId = null
                    console.log('отключаю геолокацию')
                }
            }
        },
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
                width: ${this.orientation ? '50%' : '100%'};
                background-color: ${this.settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'};
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
                -webkit-filter: brightness(${brightnessPercent / 100});
                -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
            `
            this.$emit('changeBrightness', brightnessPercent)
        },
        openSearch() {
            this.$refs.curtain.style = `
                height: 50px;
                z-index: 10;
                width: ${this.orientation ? '50%' : '100%'};
                background-color: ${this.settings.topic === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'};
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
                -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
            `
            this.$emit('openSearch')
        },
        openPowerDialog() {
            this.$refs.curtain.style = `
                height: 50px;
                z-index: 10;
                width: ${this.orientation ? '50%' : '100%'};
                background-color: ${this.settings.topic === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'};
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
                -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
            `
            this.$emit('openPowerDialog')
        },
        openApp(appInfo){
            this.$refs.curtain.style = `
                height: 50px;
                z-index: 10;
                width: ${this.orientation ? '50%' : '100%'};
                background-color: ${this.settings.topic === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'};
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 15px;
                position: fixed;
                top: 0px;
                left: 0px;
                -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
            `
            this.handleCurtain = false
            this.$emit('openApp', appInfo)
        },
        handleGesture(event, gesture){
            this.resetDisplayTimeout()
            // this.$emit('closeContextMenu')
            if (gesture === 'down' && event.target.id !== 'curtainBtn') {
                // if (this.handleCurtain) {

                // } else if (this.handleCurtain) {

                // }
                this.$emit('closeContextMenu')
                let halfHeightOfScreen = window.screen.availHeight / 2
                let greatherThanHalfOfScreen = this.$refs.curtain.getBoundingClientRect().bottom >= halfHeightOfScreen
                if (greatherThanHalfOfScreen) {
                    this.handleCurtain = false
                    this.$refs.curtain.style = `
                        height: 50px;
                        z-index: 10;
                        width: ${this.orientation ? '50%' : '100%'};
                        background-color: ${this.settings.topic === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'};
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
                    `
                } else {
                    this.handleCurtain = true
                    this.$refs.curtain.style = `
                        z-index: 10;
                        height: 50px;
                        width: ${this.orientation ? '50%' : '100%'};
                        background-color: ${this.settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'};
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
                    `
                }
                this.$emit('surfaceUpdate')
            } else if (gesture === 'move') {
                if (this.handleCurtain) {
                    let opacityAnimation = window.screen.availHeight / 100 * this.$refs.curtain.getBoundingClientRect().bottom / 4500
                    this.$refs.curtain.style = `
                        z-index: 10;
                        height: ${50 + event.y}px;
                        width: ${this.orientation ? '50%' : '100%'};
                        background-color: rgba(0, 0, 0, ${opacityAnimation});
                        background-color: ${this.settings.topic === 'dark' ? `rgba(0, 0, 0, ${opacityAnimation})` : `rgba(150, 150, 150, ${opacityAnimation})`};
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
                    `
                    this.$emit('surfaceUpdate')
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
                        width: ${this.orientation ? '50%' : '100%'};
                        background-color: ${this.settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'};
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
                    `
                } else {
                    this.$refs.curtain.style = `
                        height: 50px;
                        z-index: 10;
                        width: ${this.orientation ? '50%' : '100%'};
                        background-color: ${this.settings.topic === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(150, 150, 150, 0.4)'};
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        padding: 0px 15px;
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        -webkit-filter: ${this.settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};
                    `
                }
                this.$emit('surfaceUpdate')
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

    .showBatteryPercents {
        color: rgb(255, 255, 255);
    }

</style>