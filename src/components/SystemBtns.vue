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
    methods: {
        tabsBlock(){
            console.log(`скрываю/ разворачиваю вкладки`)
        },
        undo(){
            console.log(`назад`)
        },
        home(){
            console.log(`домашняя страница`)
        },
    }
}
</script>

<style>

</style>