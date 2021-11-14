<template>
    <div class="contextMenu" :style="`top: ${origin.y}px; left: ${origin.x}px;`" ref="contextMenu">
        <span @click="$emit('changeAppShortcut', appInfo, !appInfo.shortcut)" class="contextMenuItem">
            {{
                isAppsList ?
                    'Добавить на главный экран'
                :
                    'Убрать с экрана'
            }}
        </span>
        <span class="contextMenuItem" @click="$emit('deleteApp', appInfo)">
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
        'appInfo',
        'isAppsList'
    ],
    emits: [
        'closeContextMenu',
        'changeAppShortcut',
        'deleteApp'
    ],
    methods: {
        aboutApp() {
            alert(`Приложение: ${this.appInfo.name}`)
            this.$emit('closeContextMenu')
        }
    }
}
</script>