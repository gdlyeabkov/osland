<template>
    <div class="developerContainer">
        <div v-if="settings.developerParameters.touchPlace" class="touchPlaceInfo">
            <span>
                P 
                {{
                    !isTouch ?
                        0
                    : isTouch ?
                        1
                    :
                        0   
                }}
                /1
            </span>
            <span :class="{ changeCoords: !isTouch && xDistanse === 0 }">
                {{
                    !isTouch ?
                        `dX: ${xDistanse}`
                    : isTouch ?
                        `X: ${xCoord}`
                    :
                        `dX: ${xDistanse}`
                }}
            </span>
            <span :class="{ changeCoords: !isTouch && yDistanse === 0 }">
                {{
                    !isTouch ?
                        `dY: ${yDistanse}`
                    : isTouch ?
                        `Y: ${yCoord}`
                    :
                        `dY: ${yDistanse}`
                }}
            </span>
            <span>
                {{
                    `Xv: ${lastXCoord}`
                }}
            </span>
            <span>
                {{
                    `Yv: ${lastYCoord}`
                }}
            </span>
            <span>
                {{
                    `Prs: 0.01`
                }}
            </span>
            <span>
                {{
                    `Size: 0.01`
                }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeveloperMode',
    data() {
        return {
            isTouch: false,
            xCoord: 0.0,
            yCoord: 0.0,
            startXCoord: 0.0,
            startYCoord: 0.0,
            xDistanse: 0.0,
            yDistanse: 0.0,
            lastXCoord: 0.0,
            lastYCoord: 0.0,
            horizontalLine: null,
            verticalLine: null,
            canvas: null,
            canvasContext: null,
            touchesShower: null,
            touchesShowerWidth: 35,
            touchesShowerGround: 'rgb(215, 215, 215)'
        }
    },
    props: {
        'settings': {
            
        }
    },
    mounted() {
        window.addEventListener('mousedown', (event) => {
            if (this.settings.developerParameters.touchPlace) {
                try {
                    this.canvasContext.closePath()
                    this.canvasContext = null
                    this.canvas.remove()
                } catch (e) {
                    console.log('не могу удалить линии отладки')
                }
                this.isTouch = true
                this.startXCoord = event.x
                this.startYCoord = event.y
                this.horizontalLine = document.createElement('div')
                this.horizontalLine.style = `
                    width: 100%;
                    height: 1px;
                    background-color: rgb(0, 0, 255);
                    position: fixed;
                    left: 0px;
                    top: ${event.y}px;
                `
                document.body.appendChild(this.horizontalLine)
                this.verticalLine = document.createElement('div')
                this.verticalLine.style = `
                    width: 1px;
                    height: 100%;
                    background-color: rgb(0, 0, 255);
                    position: fixed;
                    left: ${event.x}px;
                    top: 0px;
                `
                document.body.appendChild(this.verticalLine)
                this.canvas = document.createElement('canvas')
                this.canvas.width = 1250 
                this.canvas.height = 750
                this.canvas.style = `
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    z-index: 0;
                    pointer-events: visiblePainted;
                `
                document.body.appendChild(this.canvas)
                this.canvasContext = this.canvas.getContext('2d')
                this.canvasContext.beginPath()
                this.canvasContext.moveTo(event.x, event.y)
                this.canvasContext.stroke()
            } else if (this.settings.developerParameters.showTouches) {
                this.isTouch = true
                this.touchesShower = document.createElement('div')
                this.touchesShower.style = `
                    width: ${this.touchesShowerWidth}px;
                    height: ${this.touchesShowerWidth}px;
                    background-color: ${this.touchesShowerGround};
                    position: fixed;
                    left: ${event.x - this.touchesShowerWidth / 2}px;
                    top: ${event.y - this.touchesShowerWidth / 2}px;
                    border-radius: 100%;
                    box-shadow: 0px 0px 15px rgb(100, 100, 100);
                `
                document.body.appendChild(this.touchesShower)
            }
        })
        window.addEventListener('mousemove', (event) => {
            if (this.settings.developerParameters.touchPlace) { 
                if(this.isTouch) {
                    this.xCoord = event.x
                    this.yCoord = event.y
                    this.lastXCoord = event.movementX
                    this.lastYCoord = event.movementY
                    this.horizontalLine.style = `
                        width: 100%;
                        height: 1px;
                        background-color: rgb(0, 0, 255);
                        position: fixed;
                        left: 0px;
                        top: ${event.y}px;
                    `
                    this.verticalLine.style = `
                        width: 1px;
                        height: 100%;
                        background-color: rgb(0, 0, 255);
                        position: fixed;
                        left: ${event.x}px;
                        top: 0px;
                    `
                    this.canvasContext.lineTo(event.x, event.y)
                    this.canvasContext.strokeStyle = "rgb(0, 100, 255)"
                    if(this.lastXCoord <= 1) {
                        this.canvasContext.strokeStyle = 'rgb(200, 0, 0)'
                    }
                    this.canvasContext.stroke()
                }
            } else if (this.settings.developerParameters.showTouches) { 
                if(this.isTouch) {
                    this.touchesShower.style = `
                        width: ${this.touchesShowerWidth}px;
                        height: ${this.touchesShowerWidth}px;
                        background-color: ${this.touchesShowerGround};
                        position: fixed;
                        border-radius: 100%;
                        box-shadow: 0px 0px 15px rgb(100, 100, 100);
                        left: ${event.x - this.touchesShowerWidth / 2}px;
                        top: ${event.y - this.touchesShowerWidth / 2}px;
                    `
                }
            }
        })
        window.addEventListener('mouseup', (event) => {
            if (this.settings.developerParameters.touchPlace) {
                this.isTouch = false
                this.xDistanse = event.x - this.startXCoord
                this.yDistanse = event.y - this.startYCoord
                try {
                    this.horizontalLine.remove()
                    this.verticalLine.remove()
                } catch (e) {
                    console.log('не могу удалить линии отладки')
                }
            } else if (this.settings.developerParameters.showTouches) {
                this.isTouch = false
                try {
                    this.touchesShower.remove()
                } catch (e) {
                    console.log('не могу удалить показатель нажатий')
                }
            }
        })
    }
}
</script>

<style scoped>
    
    .developerContainer {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .touchPlaceInfo {
        margin-top: 75px;
        width: 100%;
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-between;
    }

    .touchPlaceInfo > span {
        border: 1px solid rgb(0, 0, 0);
        width: calc(100% / 7);
    }

    .changeCoords {
        background-color: rgb(255, 0, 0);
    }

</style>