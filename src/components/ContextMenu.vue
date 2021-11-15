<template>
    <div class="contextMenu" :style="`top: ${origin.y}px; left: ${origin.x}px;`" ref="contextMenu">
        <span @click="$emit('changeAppShortcut', appInfo, !appInfo.shortcut)" class="contextMenuItem">
            {{
                settings.general.language === 'Русский' ?
                    (
                        isAppsList ?
                            'Добавить на главный экран'
                        :
                            'Убрать с экрана'
                    )
                : settings.general.language === 'English' ?
                    (
                        isAppsList ?
                            'Add to main screen'
                        :
                            'Leave from screen'
                    )
                :
                    (
                        isAppsList ?
                            'Добавить на главный экран'
                        :
                            'Убрать с экрана'
                    )
            }}
        </span>
        <span class="contextMenuItem" @click="$emit('deleteApp', appInfo)">
            {{
                settings.general.language === 'Русский' ?
                    'Удалить'
                : settings.general.language === 'English' ?
                    'Remove'
                :
                    'Удалить'
            }}
        </span>
        <span @click="aboutApp()" class="contextMenuItem">
            {{
                settings.general.language === 'Русский' ?
                    'О приложении'
                : settings.general.language === 'English' ?
                    'App info'
                :
                    'О приложении'
            }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    props: {
        'origin': {

        },
        'appInfo': {

        },
        'isAppsList': {

        },
        'settings': {
            default: {
                lockScreen: {
                    mode: 'moveSlide',
                    watchStyle: 'normal'
                },
                wallpapers: {
                    mainScreen: 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg',
                    lockScreen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
                },
                specialCapabilities: {
                    voiceAssistant: {
                        enabled: false
                    }
                },
                topic: 'dark',
                general: {
                    language: 'Русский'
                },
                deviceUsabilityAndParentControl: {
                    displayTimeout: 60
                }
            }
        }
    },
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