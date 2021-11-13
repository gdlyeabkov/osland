<template>
    <div v-if="lockType === 'moveSlide'" class="lock" @mousedown="handleUnlockGesture($event, 'down')" @mousemove="handleUnlockGesture($event, 'move')" @mouseup="handleUnlockGesture($event, 'up')" >
        <span class="timeOnLock">
            {{ currentTime }}
        </span>
    </div>
    <div v-else class="lock graphicKeyWrap">
        <canvas @mousedown="drawGraphicKey($event, 'down')" @mousemove="drawGraphicKey($event, 'move')" @mouseup="drawGraphicKey($event, 'up')" width="500px" height="500px" ref="graphicKey"></canvas>
    </div>
</template>

<script>
export default {
    name: 'Lock',
    data() {
        return {
            lastGesture: 0,
            handleGesture: false,
            lockType: 'moveSlide',
            context: null,
            originX: 100,
            originY: 150,
            gestures: [],
            password: '123456'
        }
    },
    props: [
        'currentTime'
    ],
    emits: [
        'unlock'
    ],
    mounted() {
        if(this.lockType === 'graphicKey') {
            this.context = this.$refs.graphicKey.getContext('2d')
            this.drawPossibleKeys()
        }
    },
    methods: {
        drawPossibleKeys() {
            this.context.clearRect(0, 0, 500, 500)
            this.context.fillStyle = "#fff";
            this.context.beginPath();
            this.context.arc(100, 150, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(250, 150, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(400, 150, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(100, 300, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(250, 300, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(400, 300, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(100, 450, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(250, 450, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.arc(400, 450, 15, 0, Math.PI * 2, false);
            this.context.fill();
            this.context.closePath();
            this.context.lineCap = 'round'
            this.context.lineJoin = 'round'
            this.context.lineWidth = 3
            this.context.strokeStyle = "rgb(0, 100, 255)";
            this.gestures.map(gesture => {
                this.context.beginPath()
                this.context.moveTo(gesture.fromX, gesture.fromY)
                this.context.lineTo(gesture.toX, gesture.toY)
                this.context.stroke()
                this.context.closePath()
            })
        },
        drawGraphicKey(event, gesture) {
            let startCanvasX = this.$refs.graphicKey.offsetLeft + this.$refs.graphicKey.clientLeft
            let startCanvasY = this.$refs.graphicKey.offsetTop + this.$refs.graphicKey.clientTop
            if (gesture === 'down') {
                if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                    this.handleGesture = true
                    this.originX = 100
                    this.originY = 150
                } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                    this.handleGesture = true
                    this.originX = 250
                    this.originY = 150
                } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                    this.handleGesture = true
                    this.originX = 400
                    this.originY = 150
                } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                    this.handleGesture = true
                    this.originX = 100
                    this.originY = 300
                } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                    this.handleGesture = true
                    this.originX = 250
                    this.originY = 300
                } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                    this.handleGesture = true
                    this.originX = 400
                    this.originY = 300
                } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                    this.handleGesture = true
                    this.originX = 100
                    this.originY = 450
                } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                    this.handleGesture = true
                    this.originX = 250
                    this.originY = 450
                } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                    this.handleGesture = true
                    this.originX = 400
                    this.originY = 450
                }
            } else if (gesture === 'move') {
                if(this.handleGesture) {
                    if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('1')) {
                            this.gestures.push({
                                character: '1',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 100,
                                toY: 150
                            })
                            this.originX = 100
                            this.originY = 150
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('2')) {
                            this.gestures.push({
                                character: '2',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 250,
                                toY: 150
                            })
                            this.originX = 250
                            this.originY = 150
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('3')) {
                            this.gestures.push({
                                character: '3',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 400,
                                toY: 150
                            })
                            this.originX = 400
                            this.originY = 150
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('4')) {
                            this.gestures.push({
                                character: '4',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 100,
                                toY: 300
                            })
                            this.originX = 100
                            this.originY = 300
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('5')) {
                            this.gestures.push({
                                character: '5',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 250,
                                toY: 300
                            })
                            this.originX = 250
                            this.originY = 300
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('6')) {
                            this.gestures.push({
                                character: '6',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 400,
                                toY: 300
                            })
                            this.originX = 400
                            this.originY = 300
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('7')) {
                            this.gestures.push({
                                character: '7',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 100,
                                toY: 450
                            })
                            this.originX = 100
                            this.originY = 450
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('8')) {
                            this.gestures.push({
                                character: '8',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 250,
                                toY: 450
                            })
                            this.originX = 250
                            this.originY = 450
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                        if(!this.gestures.flatMap(gesture => gesture.character).includes('9')) {
                            this.gestures.push({
                                character: '9',
                                fromX: this.originX,
                                fromY: this.originY,
                                toX: 400,
                                toY: 450
                            })
                            this.originX = 400
                            this.originY = 450
                            if(this.gestures.length >= 6 && this.gestures.flatMap(gesture => gesture.character).join('') === this.password) {
                                this.$emit('unlock')
                            }
                        }
                    }
                    this.context.clearRect(0, 0, 500, 500)
                    this.drawPossibleKeys()
                    this.context.beginPath()
                    this.context.moveTo(this.originX, this.originY)
                    this.context.lineTo(event.x - startCanvasX, event.y - startCanvasY)
                    this.context.stroke()
                    this.context.closePath();
                }
            } else if (gesture === 'up') {
                if(this.handleGesture) {
                    this.handleGesture = false
                    this.gestures = []
                    this.drawPossibleKeys()
                }
            }
        },
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