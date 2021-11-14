<template>
  <div class="openedApp">
    <div class="settingsApp" v-if="appInfo.name === 'Settings'">
        <div class="settingsAppHeader">
          <h4>
            Настройки
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setConnetions()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Подключения
              </span>
              <span>
                Wi-fi, Bluetooth, Авиарежим, Использование данных
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setSoundMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Звуки и вибрация
              </span>
              <span>
                Режим звука, Мелодия звонка, Громкость
              </span>
            </div>
            <span class="material-icons settingsAppSoundIcon">
              volume_up
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setNotifications()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Уведомления
              </span>
              <span>
                Уведомления приложения, строка состояния, режим "Не беспокоить"
              </span>
            </div>
            <span class="material-icons settingsAppNotificationsIcon">
              mark_chat_unread
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setBrightness()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Дисплей
              </span>
              <span>
                Яркость, Главный экран
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              light_mode
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setWallpapers()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Обои
              </span>
              <span>
                Обои главного экрана, Обои на экране блокировки
              </span>
            </div>
            <span class="material-icons settingsAppWallpapersIcon">
              image
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setTopic()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Темы
              </span>
              <span>
                Темы, Обои, Значки
              </span>
            </div>
            <span class="material-icons settingsAppTopicsIcon">
              brush
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setLockScreenMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Экран блокировки
              </span>
              <span>
                Тип блокировки экрана, Стиль часов
              </span>
            </div>
            <span class="material-icons settingsAppLockScreenIcon">
              lock
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="findDevice()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Биометрия и безопасность
              </span>
              <span>
                Распознавание лица, Отпечатки пальцев, Найти моё мобильное устройство
              </span>
            </div>
            <span class="material-icons settingsAppBiometryAndSecurityIcon">
              shield
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setPrivacy()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Конфиденциальность
              </span>
              <span>
                Диспетчер разрешений
              </span>
            </div>
            <span class="material-icons settingsAppPrivacyIcon">
              admin_panel_settings
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setLocation()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Локация
              </span>
              <span>
                Настройки местоположения, запросы на определение местоположения
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              location_on
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getAccounts()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Учетные записи и архивация
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
                Дополнительные функции
              </span>
              <span>
                Движения и жесты
              </span>
            </div>
            <span class="material-icons settingsAppAuxSettingsIcon">
              settings
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setDisplayTimeout()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Использование устройства и родительский контроль
              </span>
              <span>
                Время работы экрана, Таймеры приложений, режим отдыха перед сном
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              favorite
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getDeviceInfo()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Обслуживание устройства
              </span>
              <span>
                Аккамулятор, хранилище, ОЗУ, безопасность
              </span>
            </div>
            <span class="material-icons settingsAppServiceDeviceIcon">
              refresh
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setPermissions()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Приложения
              </span>
              <span>
                Приложения по умолчанию, Диспетчер разрешений
              </span>
            </div>
            <span class="material-icons settingsAppAppsIcon">
              apps
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setLanguage()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Общие настройки
              </span>
              <span>
                Язык и ввод, Дата и время, Сброс
              </span>
            </div>
            <span class="material-icons settingsAppGeneralSettingsIcon">
              tune
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setSpecialCapabilities()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Специальные возможности
              </span>
              <span>
                Голосовой помощник, вспомогательное меню
              </span>
            </div>
            <span class="material-icons settingsAppSpecialCapabilitiesIcon">
              accessibility_new
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getUpdates()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Обновление ПО
              </span>
              <span>
                Загрузка обновлений, Последнее обновление
              </span>
            </div>
            <span class="material-icons settingsAppSoftwareUpdateIcon">
              smartphone
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getManual()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Руководство пользователя
              </span>
              <span>
                Руководство пользователя
              </span>
            </div>
            <span class="material-icons settingsAppUserManualIcon">
              quiz
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="getHardware()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Сведения о телефоне
              </span>
              <span>
                Состояние, Юридическая информация, Имя телефона
              </span>
            </div>
            <span class="material-icons settingsAppDeviceInfoIcon">
              info
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="toggleDeveloperMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                Параметры разработчика
              </span>
              <span>
                Параметры разработчика
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

export default {
  name: 'OpenedApp',
  data() {
    return {
      settings: {
        lockScreen: {
          mode: 'modeSlide'
        },
        wallpapers: {
          mainScreen: 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg',
          lockScreen: 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg'
        }
      }
    }
  },
  props: [
    'appInfo',
    // 'settings'
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
      alert('Задать кол-во уведомлений')
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
      alert('Переключить спящий режим экрана')
      let topic = this.settings.topic === 'dark' ?
        'light'
      : this.settings.topic === 'light' ?
        'dark'
      :
        'light'
      
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
          console.log('Обновил тему')
        }
      });
    },
    getDeviceInfo() {
      alert('2 Гб RAM, Тактовая частота процесоора 1,5 МГц')
    },
    setPermissions() {
      alert('Вы дали разрешения')
    },
    resetSettings() {
      alert('Вы сбросили настройки')
      let topic = this.settings.topic === 'dark' ?
        'light'
      : this.settings.topic === 'light' ?
        'dark'
      :
        'light'
      
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
          console.log('Сбросил настройки на поумолчанию')
        }
      });
    },
    setLanguage() {
      alert('Русский/Английский')
      let topic = this.settings.topic === 'dark' ?
        'light'
      : this.settings.topic === 'light' ?
        'dark'
      :
        'light'
      
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
          console.log('Обновил тему')
        }
      });
    },
    toggleDeveloperMode() {
      alert('Вы вошли в режим разработчика')
    },
    getHardware() {
      alert('2 Гб RAM, Тактовая частота процесоора 1,5 МГц')
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
          console.log('Обновил тему')
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
      
      let watchStyle = this.settings.lockScreen.watchStyle === 'normal' ?
        'future'
      : this.settings.lockScreen.watchStyle === 'future' ?
        'outline'
      :
        'normal'
      
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
          console.log('Обновил режим экрана блокировки')
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
      let mainScreen = this.settings.wallpapers.mainScreen === 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      : this.settings.wallpapers.mainScreen === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggHh6ohVL1AAaedCBDI791kA6BvC9eC4NqQ&usqp=CAU'
      :
        'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg'
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
          console.log('Обновил обои')
        }
      });
    },
    setSpecialCapabilities() {
      let isEnabled = !this.settings.specialCapabilities.voiceAssistant.enabled
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
          console.log('Обновил специальные возможности')
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