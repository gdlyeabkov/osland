<template>
    <div @click="resetDisplayTimeout()" class="systemBtnsBlock">
        <span @click="undo()" class="material-icons">
            undo
        </span>
        <span @click="home()" class="material-icons">
            home
        </span>
        <span @click="tabsBlock()" class="material-icons">
            tab
        </span>
    </div>
</template>

<script>
export default {
    name: 'SystemBtns',
    emits: [
        'handleUndoBtn',
        'handleHomeBtn',
        'handeOpenedAppsBtn',
        'resetDisplayTimeout'
    ],
    methods: {
        resetDisplayTimeout() {
            this.$emit('resetDisplayTimeout')
        },
        tabsBlock(){
            this.$emit('handeOpenedAppsBtn')
        },
        undo(){
            this.$emit('handleUndoBtn')
        },
        home(){
            this.$emit('handleHomeBtn')
        },
    }
}
</script>

<style>

</style>