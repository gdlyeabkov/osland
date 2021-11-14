<template>
  <div class="openedApp">
    <div class="settingsApp" v-if="appInfo.name === 'Settings'">
        <div class="settingsAppHeader">
          <h4>
            Настройки
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
          <div class="settingsAppBodyItem">
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
export default {
  name: 'OpenedApp',
  data() {
    return {
      settings: {}
    }
  },
  props: [
    'appInfo',
    // 'settings'
  ],
  mounted() {
    this.settings = JSON.parse(localStorage.getItem('osland_settings'))
  },
  methods: {
    setLockScreenMode() {
      let lockScreenMode = this.settings.lockScreen.mode === 'moveSlide' ?
        'graphicKey'
      : this.settings.lockScreen.mode === 'graphicKey' ?
        'moveSlide'
      :
        'graphicKey'
      this.settings.lockScreen.mode = lockScreenMode
      localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/lockscreen/mode/set/?lockscreenmode=${lockScreenMode}`, {
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