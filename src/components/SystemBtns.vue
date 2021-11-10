<template>
    <div class="systemBtnsBlock">
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
        'handeOpenedAppsBtn'
    ],
    methods: {
        tabsBlock(){
            console.log(`скрываю/ разворачиваю вкладки`)
            this.$emit('handeOpenedAppsBtn')
        },
        undo(){
            console.log(`назад`)
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