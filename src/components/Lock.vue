<template>
    <div class="lock" @mousedown="handleUnlockGesture($event, 'down')" @mousemove="handleUnlockGesture($event, 'move')" @mouseup="handleUnlockGesture($event, 'up')" >

    </div>
</template>

<script>
export default {
    name: 'Lock',
    data() {
        return {
            lastGesture: 0,
            handleGesture: false 
        }
    },
    emits: [
        'unlock'
    ],
    methods: {
        handleUnlockGesture(event, gesture) {
            if(gesture === 'down') {
                this.handleGesture = true
            } else if(gesture === 'move') {
                if(this.handleGesture) {
                    this.lastGesture = event.y
                }
            } else if(gesture === 'up') {
                if (this.lastGesture < 150 && this.handleGesture) {
                    this.$emit('unlock')
                }
                this.handleGesture = false   
            }
        }
    }
}
</script>

<style scoped>
    .lock {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-image: url('https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg');
        z-index: 15;
        background-size: cover;
    }
</style>