<template>
    <div class="contextMenu">
        <span>
            Удалить
        </span>
        <span @click="aboutApp(appInfo)">
            О приложении
        </span>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    data() {
        return {
            appInfo: {}
        }
    },
    props: [
        'origin'
    ],
    methods: {
        aboutApp(appInfo) {
            console.log(`appInfo: ${appInfo}`)
        }
    }
}
</script>

<style scoped>
    .contextMenu {
        width: 250px;
        height: 325px;
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
</style>