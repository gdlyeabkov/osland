<template>
    <div class="speakers">
        <div class="speakersDialog" v-if="isSpeakersDialog" ref="speakersDialog">
            <div class="speakersDialogVolume" ref="speakersDialogVolume" @mousedown="handleGestures($event, 'down')" @mousemove="handleGestures($event, 'move')" @mouseup="handleGestures($event, 'up')">
            
            </div>
            <div class="speakersDialogVolumeSwitcher" ref="speakersDialogVolumeSwitcher">
            
            </div>
        </div>
        <audio :src="source" ref="speakers" @ended="$emit('resetSpeakers')"></audio>
    </div>
</template>

<script>
export default {
    name: 'Speakers',
    data() {
        return {
            handleGesture: false
        }
    },
    props: [
        'source',
        'startPlay',
        'soundCommand',
        'isSpeakersDialog',
        'changeVolume'
    ],
    emits: [
        'resetSpeakers'
    ],
    watch: {
        async changeVolume(val) {
            console.log(`changeVolume speakers: ${val}`)
        },
        async startPlay(val) {
            console.log('startPlay')
            if(val) {
                try {
                    if(this.soundCommand === 'volume turn up') {
                        if(this.$refs.speakers.volume <= 0.9) {
                            this.$refs.speakers.volume += 0.1
                            this.$refs.speakersDialogVolume.style = `
                                background-color: rgb(0, 100, 255);
                                width: 5px;
                                height: ${22.5 * (this.$refs.speakers.volume * 10)}px;
                                border-radius: 50px;
                            `
                            this.$refs.speakersDialogVolumeSwitcher.style = `
                                border-radius: 100%;
                                width: 15px;
                                height: 15px;
                                background-color: rgb(0, 100, 255);
                                position: relative;
                                top: -5px;
                                left: -7.5px;
                            `
                        }
                        setTimeout(async () => {
                            await this.$refs.speakers.play()
                        }, 1000)
                    } else if(this.soundCommand === 'volume turn down') {
                        if(this.$refs.speakers.volume >= 0.1) {
                            this.$refs.speakers.volume -= 0.1
                            this.$refs.speakersDialogVolume.style = `
                                background-color: rgb(0, 100, 255);
                                width: 5px;
                                height: ${22.5 * (this.$refs.speakers.volume * 10)}px;
                                border-radius: 50px;
                            `
                            this.$refs.speakersDialogVolumeSwitcher.style = `
                                border-radius: 100%;
                                width: 15px;
                                height: 15px;
                                background-color: rgb(0, 100, 255);
                                position: relative;
                                top: -5px;
                                left: -7.5px;
                            `
                        }
                        setTimeout(async () => {
                            await this.$refs.speakers.play()
                        }, 1000)
                    }
                } catch (e) {
                    this.$emit('resetSpeakers')
                }
            }
        }
    },
    mounted() {
        this.$emit('transferSoundMode', this.$refs.speakers.volume)
    },
    methods: {
        handleGestures(event, gesture){
            console.log(`gesture: ${gesture}; ${event.x}; ${event.y}`)
            if(gesture === 'down') {
                this.handleGesture = true
            } else if(gesture === 'move') {
                if(this.handleGesture && event.y < this.$refs.speakersDialog.getBoundingClientRect().bottom - 25) {
                    this.$refs.speakersDialogVolume.style = `
                        background-color: rgb(0, 100, 255);
                        width: 5px;
                        height: calc(275px - (25px + 15px) - (225px - ${event.y - 225}px));
                        border-radius: 50px;
                    `
                    this.$refs.speakersDialogVolumeSwitcher.style = `
                        border-radius: 100%;
                        width: 15px;
                        height: 15px;
                        background-color: rgb(0, 100, 255);
                        position: relative;
                        top: calc(275px - (25px + 15px) - (225px - ${event.y - 515}px) / 2,5);
                        left: -7.5px;
                    `
                }
            } else if(gesture === 'up') {
                this.handleGesture = false
            }
        },
        volumeTurn() {
            this.$refs.speakers.play()
        }
    }
}
</script>

<style scoped>
    .speakers {
        /* display: none; */
    }
</style>