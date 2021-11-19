<template>
    <div class="powerDialog" @click="closePowerDialog($event)" id="powerDialogId" :style="`-webkit-filter: ${settings.deviceUsabilityAndParentControl.relax && Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) >= 22 || Number(new Date().toLocaleString().split(' ')[1].split(':')[0]) <= 7 ? 'grayscale(1)' : 'none'};`">
        <span @click="powerOn()" class="btn btn-danger material-icons powerDialogBtn">
            power_settings_new
        </span>
        <span class="btn btn-success material-icons powerDialogBtn">
            refresh
        </span>
        <span class="btn btn-warning material-icons powerDialogBtn">
            warning
        </span>
    </div>
</template>

<script>
export default {
    name: 'PowerDialog',
    emits: [
        'closepowerDialog',
        'resetDisplayTimeout'
    ],
    props: {
        'settings': {
            
        }
    },
    methods: {
        powerOn() {
            // window.close()
            document.close()
        },
        closePowerDialog(event) {
            this.$emit('resetDisplayTimeout')
            if(event.target.id === 'powerDialogId') {
                this.$emit('closePowerDialog')
            }
        }
    }
}
</script>