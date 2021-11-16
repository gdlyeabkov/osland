<template>
    <div v-if="settings.display.navigation.type === 'buttons'" @click="resetDisplayTimeout()" class="systemBtnsBlock">
        <span v-if="settings.display.navigation.buttonsOrder === 'left'" @click="undo()" class="material-icons">
            undo
        </span>
        <span v-else-if="settings.display.navigation.buttonsOrder === 'right'" @click="tabsBlock()" class="material-icons">
            tab
        </span>
        <span @click="home()" class="material-icons">
            home
        </span>
        <span v-if="settings.display.navigation.buttonsOrder === 'left'" @click="tabsBlock()" class="material-icons">
            tab
        </span>
        <span v-else-if="settings.display.navigation.buttonsOrder === 'right'" @click="undo()" class="material-icons">
            undo
        </span>
    </div>
</template>

<script>
export default {
    name: 'SystemBtns',
    props: {
        'settings': {
            
        }
    },
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