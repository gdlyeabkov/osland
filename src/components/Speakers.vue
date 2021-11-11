<template>
    <div class="speakers">
        <audio :src="source" ref="speakers" @ended="$emit('resetSpeakers')" ></audio>
    </div>
</template>

<script>
export default {
    name: 'Speakers',
    props: [
        'source',
        'startPlay',
        'soundCommand'
    ],
    emits: [
        'resetSpeakers'
    ],
    watch: {
        async startPlay(val) {
            if(val) {
                if(this.soundCommand === 'volume turn up') {
                    if(this.$refs.speakers.volume <= 0.9) {
                        this.$refs.speakers.volume += 0.1
                    }
                    setTimeout(async () => {
                        await this.$refs.speakers.play()
                    }, 1000)
                } else if(this.soundCommand === 'volume turn down') {
                    if(this.$refs.speakers.volume >= 0.1) {
                        this.$refs.speakers.volume -= 0.1
                    }
                    setTimeout(async () => {
                        await this.$refs.speakers.play()
                    }, 1000)
                }
            }
        }
    },
    methods: {
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