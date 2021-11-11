<template>
    <div class="powerDialog" @click="closePowerDialog($event)" id="powerDialogId">
        <span class="btn btn-danger material-icons powerDialogBtn">
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
        'closepowerDialog'
    ],
    methods: {
        closePowerDialog(event) {
            if(event.target.id === 'powerDialogId') {
                this.$emit('closePowerDialog')
            }
        }
    }
}
</script>