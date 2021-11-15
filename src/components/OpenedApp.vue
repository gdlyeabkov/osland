<template>
  <div class="openedApp">
    <div class="settingsApp" v-if="appInfo.name === 'Settings'">
        <div class="settingsAppHeader">
          <h4>
            {{
              settings.general.language === 'Русский' ?
                'Настройки'
              : settings.general.language === 'English' ?
                'Settings'
              :
                'Настройки'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setConnetions()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Подключения'
                  : settings.general.language === 'English' ?
                    'Connections'
                  :
                    'Подключения'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Wi-fi, Bluetooth, Авиарежим, Использование данных'
                  : settings.general.language === 'English' ?
                    'Wi-fi, Bluetooth, Airmode, data usability'
                  :
                    'Wi-fi, Bluetooth, Авиарежим, Использование данных'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setSoundMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Звуки и вибрация'
                  : settings.general.language === 'English' ?
                    'Sounds and vibration'
                  :
                    'Звуки и вибрация'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Режим звука, Мелодия звонка, Громкость'
                  : settings.general.language === 'English' ?
                    'Sound mode, Ringtone, Volume'
                  :
                    'Режим звука, Мелодия звонка, Громкость'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppSoundIcon">
              volume_up
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setNotifications()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Уведомления'
                  : settings.general.language === 'English' ?
                    'Notifications'
                  :
                    'Уведомления'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Уведомления приложения, строка состояния, режим "Не беспокоить"'
                  : settings.general.language === 'English' ?
                    'Notifications of application, status row, "Dont disturb mode" mode'
                  :
                    'Уведомления приложения, строка состояния, режим "Не беспокоить"'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppNotificationsIcon">
              mark_chat_unread
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setBrightness()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Дисплей'
                  : settings.general.language === 'English' ?
                    'Display'
                  :
                    'Дисплей'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Яркость, Главный экран'
                  : settings.general.language === 'English' ?
                    'Brightness, Main screen'
                  :
                    'Яркость, Главный экран'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              light_mode
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setWallpapers()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Обои'
                  : settings.general.language === 'English' ?
                    'Wallpapers'
                  :
                    'Обои'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Обои главного экрана, Обои на экране блокировки'
                  : settings.general.language === 'English' ?
                    'Wallpapers of main screen, Wallpaper of lock screen'
                  :
                    'Обои главного экрана, Обои на экране блокировки'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWallpapersIcon">
              image
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setTopic()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Темы'
                  : settings.general.language === 'English' ?
                    'Topics'
                  :
                    'Темы'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Темы, Обои, Значки'
                  : settings.general.language === 'English' ?
                    'Topics, Wallpapers, Icons'
                  :
                    'Темы, Обои, Значки'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppTopicsIcon">
              brush
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setLockScreenMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Экран блокировки'
                  : settings.general.language === 'English' ?
                    'Lock screen'
                  :
                    'Экран блокировки'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Тип блокировки экрана, Стиль часов'
                  : settings.general.language === 'English' ?
                    'Lock screen mode, watch Style'
                  :
                    'Тип блокировки экрана, Стиль часов'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppLockScreenIcon">
              lock
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="findDevice()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Биометрия и безопасность'
                  : settings.general.language === 'English' ?
                    'Biometry and security'
                  :
                    'Биометрия и безопасность'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Распознавание лица, Отпечатки пальцев, Найти моё мобильное устройство'
                  : settings.general.language === 'English' ?
                    'Face recognition, Imprints of fingers, Find myself mobile device'
                  :
                    'Распознавание лица, Отпечатки пальцев, Найти моё мобильное устройство'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppBiometryAndSecurityIcon">
              shield
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setPrivacy()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Конфиденциальность'
                  : settings.general.language === 'English' ?
                    'Privacy'
                  :
                    'Конфиденциальность'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Диспетчер разрешений'
                  : settings.general.language === 'English' ?
                    'Permissions manager'
                  :
                    'Диспетчер разрешений'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppPrivacyIcon">
              admin_panel_settings
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setLocation()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Локация'
                  : settings.general.language === 'English' ?
                    'Location'
                  :
                    'Локация'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Настройки местоположения, запросы на определение местоположения'
                  : settings.general.language === 'English' ?
                    'Location settings, requests on location definition'
                  :
                    'Настройки местоположения, запросы на определение местоположения'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              location_on
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getAccounts()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Учетные записи и архивация'
                  : settings.general.language === 'English' ?
                    'Account and archive'
                  :
                    'Учетные записи и архивация'
                }}
              </span>
              <span>
                ...
              </span>
            </div>
            <span class="material-icons settingsAppAccountsIcon">
              key
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setGestures()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Дополнительные функции'
                  : settings.general.language === 'English' ?
                    'Auxiliary functions'
                  :
                    'Дополнительные функции'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Движения и жесты'
                  : settings.general.language === 'English' ?
                    'Motion and Gestures'
                  :
                    'Движения и жесты'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppAuxSettingsIcon">
              settings
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setDisplayTimeout()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Использование устройства и родительский контроль'
                  : settings.general.language === 'English' ?
                    'Device usability and parent control'
                  :
                    'Использование устройства и родительский контроль'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Время работы экрана, Таймеры приложений, режим отдыха перед сном'
                  : settings.general.language === 'English' ?
                    'Time work of screen, Timers of applications, relax mode before sleep'
                  :
                    'Время работы экрана, Таймеры приложений, режим отдыха перед сном'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              favorite
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getHardware()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Обслуживание устройства'
                  : settings.general.language === 'English' ?
                    'Device management'
                  :
                    'Обслуживание устройства'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Аккамулятор, хранилище, ОЗУ, безопасность'
                  : settings.general.language === 'English' ?
                    'Accumulator, storage, RAM, security'
                  :
                    'Аккамулятор, хранилище, ОЗУ, безопасность'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppServiceDeviceIcon">
              refresh
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getDefaultApps()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Приложения'
                  : settings.general.language === 'English' ?
                    'Applications'
                  :
                    'Приложения'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Приложения по умолчанию, Диспетчер разрешений'
                  : settings.general.language === 'English' ?
                    'Applications by default, Permissions manager'
                  :
                    'Приложения по умолчанию, Диспетчер разрешений'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppAppsIcon">
              apps
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="resetSettings(); setLanguage();">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Общие настройки'
                  : settings.general.language === 'English' ?
                    'General settings'
                  :
                    'Общие настройки'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Язык и ввод, Дата и время, Сброс'
                  : settings.general.language === 'English' ?
                    'Language and input, Date and time, Reset'
                  :
                    'Язык и ввод, Дата и время, Сброс'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppGeneralSettingsIcon">
              tune
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setSpecialCapabilities()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Специальные возможности'
                  : settings.general.language === 'English' ?
                    'Special capabilities'
                  :
                    'Специальные возможности'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Голосовой помощник, вспомогательное меню'
                  : settings.general.language === 'English' ?
                    'Voice assistant, auxiliary menus'
                  :
                    'Голосовой помощник, вспомогательное меню'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppSpecialCapabilitiesIcon">
              accessibility_new
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getUpdates()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Обновление ПО'
                  : settings.general.language === 'English' ?
                    'Software updates'
                  :
                    'Обновление ПО'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Загрузка обновлений, Последнее обновление'
                  : settings.general.language === 'English' ?
                    'Updates uploading, Last updates'
                  :
                    'Загрузка обновлений, Последнее обновление'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppSoftwareUpdateIcon">
              smartphone
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getManual()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Руководство пользователя'
                  : settings.general.language === 'English' ?
                    'User manual'
                  :
                    'Руководство пользователя'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Руководство пользователя'
                  : settings.general.language === 'English' ?
                    'User manual'
                  :
                    'Руководство пользователя'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppUserManualIcon">
              quiz
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getDeviceInfo()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сведения о телефоне'
                  : settings.general.language === 'English' ?
                    'Phone information'
                  :
                    'Сведения о телефоне'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние, Юридическая информация, Имя телефона'
                  : settings.general.language === 'English' ?
                    'State, Legal information, Phone name'
                  :
                    'Состояние, Юридическая информация, Имя телефона'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppDeviceInfoIcon">
              info
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="toggleDeveloperMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Параметры разработчика'
                  : settings.general.language === 'English' ?
                    'Developer mode'
                  :
                    'Параметры разработчика'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Параметры разработчика'
                  : settings.general.language === 'English' ?
                    'Developer mode'
                  :
                    'Параметры разработчика'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppDeveloperSettingsIcon">
              code
            </span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
const openGeocoder = require('node-open-geocoder')
var moment = require('moment')

export default {
  name: 'OpenedApp',
  data() {
    return {
      settings: {
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
  props: [
    'appInfo',
    // 'settings',
    'launchTime'
  ],
  mounted() {
    
    // this.settings = JSON.parse(localStorage.getItem('osland_settings'))
    fetch(`http://localhost:4000/api/apps/all/get/`, {
      mode: 'cors',
      method: 'GET'
    }).then(response => response.body).then(rb  => {
      const reader = rb.getReader()
      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then( ({done, value}) => {
              if (done) {
                console.log('done', done);
                controller.close();
                return;
              }
              controller.enqueue(value);
              console.log(done, value);
              push();
            })
          }
          push();
        }
      });
    }).then(stream => {
      return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
    })
    .then(result => {
      this.settings = JSON.parse(result).settings
    });

  },
  methods: {
    setLocation() {
      alert('Переключить геолокацию')
    },
    setConnetions() {
      alert('Задать сетевые подключения')
    },
    setSoundMode() {
      alert('Задать звуковой профиль')
    },
    setNotifications() {
      let isEnabled = !this.settings.notifications.enabled
      this.settings.notifications.enabled = isEnabled
      // if(this.settings.notifications.enabled) {
      if(isEnabled) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // let notification = new Notification(`Уведомления были включены!`)
            let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                'Уведомления были включены!'
              : this.settings.general.language === 'English' ?
                'Notifications enabled!'
              :
                'Уведомления были включены!'}`)
          }
        })
      }
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/notifications/enabled/set/?enabled=${isEnabled}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
        }
      });
    },
    setBrightness() {
      alert('Задать яркость')
    },
    setGestures() {
      alert('Задать чувствительность движений')
    },
    setPrivacy() {
      alert('Задать конфиденциальность')
    },
    setGetstures() {
      alert('Задать чувствительность движений')
    },
    setDisplayTimeout() {
      let displayTimeout = this.settings.deviceUsabilityAndParentControl.displayTimeout === 60 ?
        30
      : this.settings.deviceUsabilityAndParentControl.displayTimeout === 30 ?
        10
      :
        60
      this.settings.deviceUsabilityAndParentControl.displayTimeout = displayTimeout
      
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/deviceusabilityandparentcontrol/timeout/set/?timeout=${displayTimeout}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Обновлено время отключения дисплея на ${displayTimeout} сек.`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    `Обновлено время отключения дисплея на ${displayTimeout} сек.`
                  : this.settings.general.language === 'English' ?
                    `Update time disable display on ${displayTimeout} sec.`
                  :
                    `Обновлено время отключения дисплея на ${displayTimeout} сек.`}`)
              }
            })
          }

        }
      });
    },
    getDeviceInfo() {
      let launchMoment = new moment(this.launchTime, 'DD.MM.YYYY, hh:mm:ss')
      let nowMoment = new moment()
      let duration = moment.duration(launchMoment.diff(nowMoment))
      let elapsedHours = Math.floor(duration.as('hours'))
      let elapsedMinutes = Math.floor(duration.as('minutes'))
      let elapsedSeconds = duration.as('seconds')
      // alert(`Запущено ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`)
      let elapsedMoment = new moment(duration)
      alert(`Запущено ${elapsedMoment.format('HH:mm:SS')}`)
    },
    getDefaultApps() {
      alert('Предустановленные приложения: Osland@1.0.0, OslandSettings@1.0.0')
    },
    resetSettings() {
      
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/reset/`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Сброшены настройки на по умолчанию!`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    'Сброшены настройки на по умолчанию!'
                  : this.settings.general.language === 'English' ?
                    'Reset settings to default!'
                  :
                    'Сброшены настройки на по умолчанию!'
                  }`)
              }
            })
          }

        }
      });
    },
    setLanguage() {
      let language = this.settings.general.language === 'Русский' ?
        'English'
      : this.settings.general.language === 'English' ?
        'Русский'
      :
        'English'
      this.settings.general.language = language
      
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/general/language/set/?language=${language}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                let notification = new Notification(`${language === 'Русский' ? `Обновлён язык на ${language}` : language === 'English' ? `Switched language to ${language}` : 'Обновлён язык на Русский'}`)
              }
            })
          }
          
        }
      });
    },
    toggleDeveloperMode() {
      alert('Вы вошли в режим разработчика')
    },
    getHardware() {
      alert(`${this.settings.deviceManagement.memory} Гб RAM, Кол-во ядер процесоора ${this.settings.deviceManagement.cpu}`)
    },
    getManual() {
      alert('OSLand - является OpenSource продуктом в сфере мобильных ОС.\nОбращайтесь с операционной системой OSLand бережно.')
    },
    getUpdates() {
      alert('OsLand v1.0.0')
    },
    getAccounts() {
      alert('Поддерживается только 1 учетная запись')
    },
    setTopic() {
      let topic = this.settings.topic === 'dark' ?
        'light'
      : this.settings.topic === 'light' ?
        'dark'
      :
        'light'
      this.settings.topic = topic
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/topic/set/?topic=${topic}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Тема обновлена на ${topic === 'light' ? 'Светлая' : topic === 'dark' ? 'Темная' : 'Светлая'}!`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `Тема обновлена на ${topic === 'light' ? 'Светлая' : topic === 'dark' ? 'Темная' : 'Светлая'}!`
                    : this.settings.general.language === 'English' ?
                      `Topic update to ${topic === 'light' ? 'Light' : topic === 'dark' ? 'Dark' : 'Light'}!`
                    :
                      `Тема обновлена на ${topic === 'light' ? 'Светлая' : topic === 'dark' ? 'Темная' : 'Светлая'}!`
                  }`)

              }
            })
          }

        }
      });
    },
    findDevice() {
      let destination = 'Неизветно'
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              let lat = position.coords.latitude
              let lng = position.coords.longitude
              openGeocoder()
                .reverse(lng, lat)
                  .end((err, res) => {
                    destination = `${res.address.city}, ${res.address.state}, ${res.address.country}`
                    alert(`Расположение: ${destination}`)
                  })
          })
      } else  {
        alert(`Расположение: ${destination}`)
      }
    },
    setLockScreenMode() {
      let lockScreenMode = this.settings.lockScreen.mode === 'moveSlide' ?
        'graphicKey'
      : this.settings.lockScreen.mode === 'graphicKey' ?
        'moveSlide'
      :
        'graphicKey'
      this.settings.lockScreen.mode = lockScreenMode

      let watchStyle = this.settings.lockScreen.watchStyle === 'normal' ?
        'future'
      : this.settings.lockScreen.watchStyle === 'future' ?
        'outline'
      :
        'normal'
      this.settings.lockScreen.watchStyle = watchStyle

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/lockscreen/set/?lockscreenmode=${lockScreenMode}&watchstyle=${watchStyle}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Экран блокировки был сменён на ${lockScreenMode === 'moveSlide' ? 'Сдвинуть слайд' : lockScreenMode === 'graphicKey' ? 'Графический ключ' : 'Сдвинуть слайд' }!`)
                // notification = new Notification(`Стиль часов был сменён на ${watchStyle === 'normal' ? 'Обычный' : watchStyle === 'future' ? 'Футуризм' : watchStyle === 'outline' ? 'Обводка' : 'Обычный' }!`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    `Экран блокировки был сменён на ${lockScreenMode === 'moveSlide' ? 'Сдвинуть слайд' : lockScreenMode === 'graphicKey' ? 'Графический ключ' : 'Сдвинуть слайд' }!`
                  : this.settings.general.language === 'English' ?
                    `Lock screen was changed to ${lockScreenMode === 'moveSlide' ? 'Move slide' : lockScreenMode === 'graphicKey' ? 'Graphic key' : 'Move slide' }!`
                  :
                    `Экран блокировки был сменён на ${lockScreenMode === 'moveSlide' ? 'Сдвинуть слайд' : lockScreenMode === 'graphicKey' ? 'Графический ключ' : 'Сдвинуть слайд' }!`
                }`)
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `Стиль часов был сменён на ${watchStyle === 'normal' ? 'Обычный' : watchStyle === 'future' ? 'Футуризм' : watchStyle === 'outline' ? 'Обводка' : 'Обычный' }!`
                    : this.settings.general.language === 'English' ?
                      `Watch style was changed to ${watchStyle === 'normal' ? 'Normal' : watchStyle === 'future' ? 'Future' : watchStyle === 'outline' ? 'Outline' : 'Normal' }!`
                    :
                      `Стиль часов был сменён на ${watchStyle === 'normal' ? 'Обычный' : watchStyle === 'future' ? 'Футуризм' : watchStyle === 'outline' ? 'Обводка' : 'Обычный' }!`
                  }`)
              }
            })
          }

        }
      });
    },
    setWallpapers() {
      let lockScreen = this.settings.wallpapers.mainScreen === 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggHh6ohVL1AAaedCBDI791kA6BvC9eC4NqQ&usqp=CAU'
      : this.settings.wallpapers.mainScreen === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      :
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      this.settings.wallpapers.lockScreen = lockScreen
      let mainScreen = this.settings.wallpapers.mainScreen === 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      : this.settings.wallpapers.mainScreen === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggHh6ohVL1AAaedCBDI791kA6BvC9eC4NqQ&usqp=CAU'
      :
        'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg'
      this.settings.wallpapers.mainScreen = mainScreen
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/wallpapers/set/?mainscreen=${mainScreen}&lockscreen=${lockScreen}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Обои обновлены!`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    'Обои обновлены!'
                  : this.settings.general.language === 'English' ?
                    'Wallpapers updated!'
                  :
                    'Обои обновлены!'
                }`)
              }
            })
          }

        }
      });
    },
    setSpecialCapabilities() {
      let isEnabled = !this.settings.specialCapabilities.voiceAssistant.enabled
      this.settings.specialCapabilities.voiceAssistant.enabled = isEnabled

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/specialcapabilities/voiceassistant/enabled/set/?enabled=${isEnabled}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
      }).then(stream => {
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        if(JSON.parse(result).status === 'OK') {
          
          if(this.settings.notifications.enabled) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                // let notification = new Notification(`Обновил специальные возможности`)
                let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    'Обновлены специальные возможности!'
                  : this.settings.general.language === 'English' ?
                    'Update special capabilities'
                  :
                    'Обновлены специальные возможности!'
                }`)
              }
            })
          }
        }
      });
    }
  }
}
</script>
<style scoped>
  .settingsApp {
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 565px;
    overflow-y: scroll;
  }

  .settingsAppHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
  }

  .settingsAppBody {
    display: flex;
    flex-direction: column;
    
  }

  .settingsAppBodyItem {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid rgb(200, 200, 200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 35px;
  }

  .settingsAppBodyItem:hover {
    background-color: rgb(245, 245, 245);
  }

  .settingsAppBodyItem:active {
    background-color: rgb(235, 235, 235);
  }

  .settingsAppBodyItemLabel {
    font-weight: bolder;
    font-size: 24px;
  }

  .settingsAppBodyItemContent {
    display: flex;
    flex-direction: column;
  }

  .settingsAppWifiIcon {
    color: rgb(0, 100, 255);
    font-size: 48px;
  }

  .settingsAppSoundIcon {
    color: rgb(150, 100, 255);
    font-size: 48px;
  }

  .settingsAppNotificationsIcon {
    color: rgb(255, 75, 75);
    font-size: 36px;
  }

  .settingsAppDisplayIcon {
    color: rgb(0, 255, 0);
    font-size: 48px;
  }

  .settingsAppWallpapersIcon {
    color: rgb(255, 75, 75);
    font-size: 36px;
  }

  .settingsAppTopicsIcon {
    color: rgb(150, 100, 255);
    font-size: 48px;
  }

  .settingsAppLockScreenIcon {
    color: rgb(0, 150, 0);
    font-size: 36px;
  }

  .settingsAppBiometryAndSecurityIcon {
    color: rgb(150, 50, 200);
    font-size: 48px;
  }

  .settingsAppPrivacyIcon {
    color: rgb(150, 100, 255);
    font-size: 48px;
  }
  
  .settingsAppAccountsIcon {
    color: rgb(0, 100, 255);
    font-size: 36px;
  }

  .settingsAppAuxSettingsIcon {
    color: rgb(250, 200, 0);
    font-size: 36px;
  }

  .settingsAppServiceDeviceIcon {
    color: rgb(0, 150, 100);
    font-size: 36px;
  }

  .settingsAppAppsIcon {
    color: rgb(0, 150, 255);
    font-size: 36px;
  }

  .settingsAppGeneralSettingsIcon {
    color: rgb(125, 125, 125);
    font-size: 36px;
  }

  .settingsAppSpecialCapabilitiesIcon {
    color: rgb(0, 150, 0);
    font-size: 36px;
  }

  .settingsAppSoftwareUpdateIcon {
    color: rgb(0, 150, 255);
    font-size: 36px;
  }

  .settingsAppUserManualIcon {
    color: rgb(250, 200, 0);
    font-size: 36px;
  }

  .settingsAppDeviceInfoIcon {
    color: rgb(125, 125, 125);
    font-size: 36px;
  }

  .settingsAppDeveloperSettingsIcon {
    color: rgb(125, 125, 125);
    font-size: 36px;
  }

</style>