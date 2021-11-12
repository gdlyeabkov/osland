<template>
    <div class="contextMenu" :style="`top: ${origin.y}px; left: ${origin.x}px;`" ref="contextMenu">
        <span class="contextMenuItem">
            Удалить
        </span>
        <span @click="aboutApp()" class="contextMenuItem">
            О приложении
        </span>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    props: [
        'origin',
        'appInfo'
    ],
    emits: [
        'closeContextMenu'
    ],
    methods: {
        aboutApp() {
            alert(`Приложение: ${this.appInfo.name}`)
            this.$emit('closeContextMenu')
        }
    }
}
</script>

<style scoped>
    .contextMenu {
        width: 200px;
        height: 225px;
        border-radius: 8px;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 15px;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0px;
        left: 0px;
        font-weight: bolder;
    }

    .contextMenuItem {
        margin: 5px 0px;
    }
</style>