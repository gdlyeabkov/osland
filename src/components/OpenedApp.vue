<template>
  <div class="openedApp">
    <div class="settingsApp" v-if="appInfo.name === 'Settings'" ref="openedAppRef" @mousemove="$emit('resetDisplayTimeout')" @scroll="$emit('resetDisplayTimeout')" :style="`background-color: ${settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'}; zoom: ${settings.display.screenScale}; height: ${settings.display.navigation.type === 'gesture' ? '625' : '575'}px;`">
      <div v-if="activeTab === 'settings'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'connections'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'soundsAndVibration'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'notifications'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'display'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'wallpapers'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'lockScreen'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'accountsAndArchive'">
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
                    'Аккумулятор, хранилище, ОЗУ, безопасность'
                  : settings.general.language === 'English' ?
                    'Accumulator, storage, RAM, security'
                  :
                    'Аккумулятор, хранилище, ОЗУ, безопасность'
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
          <div class="settingsAppBodyItem" @click="activeTab = 'general'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'softwareUpdates'">
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
          <div class="settingsAppBodyItem" @click="activeTab = 'phoneInformation'">
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
      <div v-else-if="activeTab === 'lockScreen'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Экран блокировки'
              : settings.general.language === 'English' ?
                'Lock screen'
              :
                'Экран блокировки'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setLockScreenMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Тип блокировки экрана'
                  : settings.general.language === 'English' ?
                    'Lock screen mode'
                  :
                    'Тип блокировки экрана'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    `${settings.lockScreen.mode === 'moveSlide' ? 'Провести по экрану' : settings.lockScreen.mode === 'graphicKey' ? 'Графический ключ' : 'Провести по экрану'}`
                  : settings.general.language === 'English' ?
                    `${settings.lockScreen.mode === 'moveSlide' ? 'Move slide' : settings.lockScreen.mode === 'graphicKey' ? 'Graphic key' : 'Move slide'}`
                  :
                    `${settings.lockScreen.mode === 'moveSlide' ? 'Провести по экрану' : settings.lockScreen.mode === 'graphicKey' ? 'Графический ключ' : 'Провести по экрану'}`
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
            <div v-show="isPasswordInput" class="lock graphicKeyWrap" :style="`background-image: url(${settings.wallpapers.lockScreen});`">
              <canvas @mousedown="drawGraphicKey($event, 'down')" @mousemove="drawGraphicKey($event, 'move')" @mouseup="drawGraphicKey($event, 'up')" width="500px" height="500px" ref="graphicKey"></canvas>
            </div>
          </div>
          <div class="settingsAppBodyItem" @click="setWatchStyle()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Стиль часов'
                  : settings.general.language === 'English' ?
                    'Watch style'
                  :
                    'Стиль часов'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Выберите тип и цвет часов на экране блокировки'
                  : settings.general.language === 'English' ?
                    'Select type and color of watch from lock screen'
                  :
                    'Выберите тип и цвет часов на экране блокировки'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>

      </div>
      <div v-else-if="activeTab === 'wallpapers'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Обои'
              : settings.general.language === 'English' ?
                'Wallpapers'
              :
                'Обои'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setWallpapersLockScreen()">
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
                    'Экран блокировки'
                  : settings.general.language === 'English' ?
                    'Lock screen'
                  :
                    'Экран блокировки'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setWallpapersMainScreen()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Главный экран'
                  : settings.general.language === 'English' ?
                    'Main screen'
                  :
                    'Главный экран'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Главный экран'
                  : settings.general.language === 'English' ?
                    'Main screen'
                  :
                    'Главный экран'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>

      </div>
      <div v-else-if="activeTab === 'general'">
        <div class="settingsAppHeader">
          <h4  :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Общие настройки'
              : settings.general.language === 'English' ?
                'General settings'
              :
                'Общие настройки'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setLanguage()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Язык и ввод'
                  : settings.general.language === 'English' ?
                    'Language and input'
                  :
                    'Язык и ввод'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Язык и ввод'
                  : settings.general.language === 'English' ?
                    'Language and input'
                  :
                    'Язык и ввод'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="activeTab = 'dateAndTime'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Дата и время'
                  : settings.general.language === 'English' ?
                    'Date and time'
                  :
                    'Дата и время'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Дата и время'
                  : settings.general.language === 'English' ?
                    'Date and time'
                  :
                    'Дата и время'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="giveFeedback()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Свяжитесь с нами'
                  : settings.general.language === 'English' ?
                    'Feedback'
                  :
                    'Свяжитесь с нами'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Свяжитесь с нами'
                  : settings.general.language === 'English' ?
                    'Feedback'
                  :
                    'Свяжитесь с нами'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="resetSettings()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сброс'
                  : settings.general.language === 'English' ?
                    'Reset'
                  :
                    'Сброс'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Сброс'
                  : settings.general.language === 'English' ?
                    'Reset'
                  :
                    'Сброс'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>

      </div>
      <div v-else-if="activeTab === 'display'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Дисплей'
              : settings.general.language === 'English' ?
                'Display'
              :
                'Дисплей'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Яркость'
                  : settings.general.language === 'English' ?
                    'Brightness'
                  :
                    'Яркость'
                }}
              </span>
              <div class="brightnessFooter">
                <div @click="changeBrightness($event)" class="brightnessControl progress" id="curtainBtn">
                  <div  @click="changeBrightness($event)" ref="brightnessControlFiller" class="brightnessControlFiller progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="50" aria-valuemax="100"  id="curtainBtn">
                  </div>
                </div>
              </div>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setFontSize()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Размер и стиль шрифта'
                  : settings.general.language === 'English' ?
                    'Font size and style'
                  :
                    'Размер и стиль шрифта'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Размер и стиль шрифта'
                  : settings.general.language === 'English' ?
                    'Font size and style'
                  :
                    'Размер и стиль шрифта'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setScreenScale()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Масштабирование экрана'
                  : settings.general.language === 'English' ?
                    'Screen scale'
                  :
                    'Масштабирование экрана'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Масштабирование экрана'
                  : settings.general.language === 'English' ?
                    'Screen scale'
                  :
                    'Масштабирование экрана'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setDisplayTimeout()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Тайм-аут экрана'
                  : settings.general.language === 'English' ?
                    'Display timeout'
                  :
                    'Тайм-аут экрана'
                }}
              </span>
              <span>
                Период бездействия -
                {{
                  `${settings.deviceUsabilityAndParentControl.displayTimeout} `
                }}
                {{
                  settings.general.language === 'Русский' ?
                    'секунд'
                  : settings.general.language === 'English' ?
                    'seconds'
                  :
                    'cекунд'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setNavigationType(); setNavigationButtonsOrder()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Навигационная панель'
                  : settings.general.language === 'English' ?
                    'Navigation bar'
                  :
                    'Навигационная панель'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Управляйте с помощью кнопок \"Домой\", \"Назад\" и \"Последние\" или используйте жесты, чтобы освободить экран'
                  : settings.general.language === 'English' ?
                    'seconds'
                  :
                    'cекунд'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setTopic()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Режим затемнения'
                  : settings.general.language === 'English' ?
                    'Dimmed mode'
                  :
                    'Режим затемнения'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Режим затемнения'
                  : settings.general.language === 'English' ?
                    'Dimmed mode'
                  :
                    'Режим затемнения'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>

      </div>
      <div v-else-if="activeTab === 'notifications'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Уведомления'
              : settings.general.language === 'English' ?
                'Notifications'
              :
                'Уведомления'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setNotifications">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Показывать уведомления'
                  : settings.general.language === 'English' ?
                    'Show notifications'
                  :
                    'Показывать уведомления'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Показывать уведомления'
                  : settings.general.language === 'English' ?
                    'Show notifications'
                  :
                    'Показывать уведомления'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="setShowBatteryPercents()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Строка состояния'
                  : settings.general.language === 'English' ?
                    'Status row'
                  :
                    'Строка состояния'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Строка состояния'
                  : settings.general.language === 'English' ?
                    'Status row'
                  :
                    'Строка состояния'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'accountsAndArchive'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Учетные записи и архивация'
              : settings.general.language === 'English' ?
                'Accounts and archive'
              :
                'Учетные записи и архивация'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="activeTab = 'accounts'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Учетные записи'
                  : settings.general.language === 'English' ?
                    'Accounts'
                  :
                    'Учетные записи'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Учетные записи'
                  : settings.general.language === 'English' ?
                    'Accounts'
                  :
                    'Учетные записи'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Архивация'
                  : settings.general.language === 'English' ?
                    'Archive'
                  :
                    'Архивация'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Архивация'
                  : settings.general.language === 'English' ?
                    'Archive'
                  :
                    'Архивация'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'softwareUpdates'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Обновление ПО'
              : settings.general.language === 'English' ?
                'Software updates'
              :
                'Обновление ПО'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="getUpdates()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Загрузка и установка'
                  : settings.general.language === 'English' ?
                    'Uploading and installing'
                  :
                    'Загрузка и установка'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    `Дата последней проверки: ${settings.updates.lastCheck.split(' ')[0].split('-')[2]}.${settings.updates.lastCheck.split(' ')[0].split('-')[1]}.${settings.updates.lastCheck.split(' ')[0].split('-')[0]}\nЗа загрузку по мобильным сетям может взиматься дополнительная плата. По возможности используйте Wi-fi.`
                  : settings.general.language === 'English' ?
                    `Date of last check: ${settings.updates.lastCheck.split(' ')[0].split('-')[1]}.${settings.updates.lastCheck.split(' ')[0].split('-')[2]}.${settings.updates.lastCheck.split(' ')[0].split('-')[0]}\nFor upload from mobile networks can take auxiliary moneys. Do you can use Wi-fi.`
                  :
                    `Дата последней проверки: ${settings.updates.lastCheck.split(' ')[0].split('-')[2]}.${settings.updates.lastCheck.split(' ')[0].split('-')[1]}.${settings.updates.lastCheck.split(' ')[0].split('-')[0]}\nЗа загрузку по мобильным сетям может взиматься дополнительная плата. По возможности используйте Wi-fi.`
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Автозагрузка по Wi-fi'
                  : settings.general.language === 'English' ?
                    'Auto-upload from Wi-fi'
                  :
                    'Автозагрузка по Wi-fi'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Автоматическая загрузка обновлений ПО при подключении к сети Wi-fi'
                  : settings.general.language === 'English' ?
                    'Auto-uploading software updates when connected to Wi-fi network'
                  :
                    'Автоматическая загрузка обновлений ПО при подключении к сети Wi-fi'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Последнее обновление'
                  : settings.general.language === 'English' ?
                    'Last update'
                  :
                    'Последнее обновление'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    `Последнее обновление установлено ${settings.updates.lastUpdate.split(' ')[0].split('-')[2]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[1]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[0]} в ${settings.updates.lastUpdate.split(' ')[1].split(':')[0]}:${settings.updates.lastUpdate.split(' ')[1].split(':')[1]}`
                  : settings.general.language === 'English' ?
                    `Last update installed at ${settings.updates.lastUpdate.split(' ')[0].split('-')[1]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[2]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[0]} ${settings.updates.lastUpdate.split(' ')[1].split(':')[0]}:${settings.updates.lastUpdate.split(' ')[1].split(':')[1]} ${new Intl.DateTimeFormat('en-AU', {
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    timeZoneName: 'short'
                  }).format(new Date(settings.updates.lastUpdate)).split(' ')[1].toUpperCase()}`
                  :
                    `Последнее обновление установлено ${settings.updates.lastUpdate.split(' ')[0].split('-')[2]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[1]}.${settings.updates.lastUpdate.split(' ')[0].split('-')[0]} в ${settings.updates.lastUpdate.split(' ')[1].split(':')[0]}:${settings.updates.lastUpdate.split(' ')[1].split(':')[1]}`
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'soundsAndVibration'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Звуки и вибрация'
              : settings.general.language === 'English' ?
                'Sounds and vibration'
              :
                'Звуки и вибрация'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setSoundMode()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Режим звука'
                  : settings.general.language === 'English' ?
                    'Sound mode'
                  :
                    'Режим звука'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Режим звука'
                  : settings.general.language === 'English' ?
                    'Sound mode'
                  :
                    'Режим звука'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Громкость'
                  : settings.general.language === 'English' ?
                    'Volume'
                  :
                    'Громкость'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Громкость'
                  : settings.general.language === 'English' ?
                    'Volume'
                  :
                    'Громкость'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'connections'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Подключения'
              : settings.general.language === 'English' ?
                'Connections'
              :
                'Подключения'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="setConnetions()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Режим звука'
                  : settings.general.language === 'English' ?
                    'Sound mode'
                  :
                    'Режим звука'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Режим звука'
                  : settings.general.language === 'English' ?
                    'Sound mode'
                  :
                    'Режим звука'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Громкость'
                  : settings.general.language === 'English' ?
                    'Volume'
                  :
                    'Громкость'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Громкость'
                  : settings.general.language === 'English' ?
                    'Volume'
                  :
                    'Громкость'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'phoneInformation'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Сведения о телефоне'
              : settings.general.language === 'English' ?
                'Phone info'
              :
                'Сведения о телефоне'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="activeTab = 'state'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние'
                  : settings.general.language === 'English' ?
                    'State'
                  :
                    'Состояние'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Просмотр состояния SIM-карты, IMEI-устройства и другой информации'
                  : settings.general.language === 'English' ?
                    'View state SIM, IMEI and other info'
                  :
                    'Просмотр состояния SIM-карты, IMEI-устройства и другой информации'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="activeTab = 'legalInfo'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Юридическая информация'
                  : settings.general.language === 'English' ?
                    'Legal info'
                  :
                    'Юридическая информация'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Юридическая информация'
                  : settings.general.language === 'English' ?
                    'Legal info'
                  :
                    'Юридическая информация'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="activeTab = 'softwareInfo'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сведения о ПО'
                  : settings.general.language === 'English' ?
                    'Software details'
                  :
                    'Сведения о ПО'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Просмотр текущей версии OsLand, полосы частот, ядра, номера сборки и т. д.'
                  : settings.general.language === 'English' ?
                    'View current version of OsLand, broadcast, kernels, assembly, etc'
                  :
                    'Просмотр текущей версии OsLand, полосы частот, ядра, номера сборки и т. д.'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="activeTab = 'accumulatorDetails'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сведения об аккумуляторе'
                  : settings.general.language === 'English' ?
                    'Details of accumulator'
                  :
                    'Сведения об аккумуляторе'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Просмотр состояния аккумулятора, оставшегося уровня заряда и другой информации'
                  : settings.general.language === 'English' ?
                    'View state accumulator, left level of battery and other info'
                  :
                    'Просмотр состояния аккумулятора, оставшегося уровня заряда и другой информации'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'accounts'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Учетные записи'
              : settings.general.language === 'English' ?
                'Accounts'
              :
                'Учетные записи'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div v-for="account in settings.accountsAndArchive.accounts" :key="account.login" class="settingsAppBodyItem">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  account.login
                }}
              </span>
              <span>
                {{
                  account.service
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              email
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="addAcount()">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Добавить учетную запись'
                  : settings.general.language === 'English' ?
                    'Add account'
                  :
                    'Добавить учетную запись'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Добавить учетную запись'
                  : settings.general.language === 'English' ?
                    'Add account'
                  :
                    'Добавить учетную запись'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Автосинхронизация данных'
                  : settings.general.language === 'English' ?
                    'Autosync data'
                  :
                    'Автосинхронизация данных'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Автосинхронизация данных'
                  : settings.general.language === 'English' ?
                    'Autosync data'
                  :
                    'Автосинхронизация данных'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              wifi
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'dateAndTime'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Дата и время'
              : settings.general.language === 'English' ?
                'Date and time'
              :
                'Дата и время'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Автоопределение времени'
                  : settings.general.language === 'English' ?
                    'Auto-definition of time'
                  :
                    'Автоопределение времени'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Использование даты и времени сети'
                  : settings.general.language === 'English' ?
                    'Use date and time of network'
                  :
                    'Использование даты и времени сети'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon chip">
              {{
                true ?
                  'toggle_on'
                :
                  'toggle_off'
              }}
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    '24-часовой формат'
                  : settings.general.language === 'English' ?
                    '24-hours format'
                  :
                    '24-часовой формат'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'state'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Состояние'
              : settings.general.language === 'English' ?
                'State'
              :
                'Состояние'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" @click="activeTab = 'simState'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние SIM-карты'
                  : settings.general.language === 'English' ?
                    'SIM state'
                  :
                    'Состояние SIM-карты'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" @click="activeTab = 'imeiDetails'">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сведения об IMEI'
                  : settings.general.language === 'English' ?
                    'IMEI details'
                  :
                    'Сведения об IMEI'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'IP-адресс'
                  : settings.general.language === 'English' ?
                    'IP'
                  :
                    'IP-адресс'
                }}
              </span>
              <span>
                {{
                  '192.168.0.101'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'MAC-адресс Wi-fi'
                  : settings.general.language === 'English' ?
                    'MAC of Wi-fi'
                  :
                    'MAC-адресс Wi-fi'
                }}
              </span>
              <span>
                {{
                  '48:79:4D:04:A0:9F'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Адресс Bluetooth'
                  : settings.general.language === 'English' ?
                    'Bluetooth address'
                  :
                    'Адресс Bluetooth'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Серийный номер'
                  : settings.general.language === 'English' ?
                    'Serial number'
                  :
                    'Серийный номер'
                }}
              </span>
              <span>
                {{
                  'R9WMB0EV1AJ'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Время работы'
                  : settings.general.language === 'English' ?
                    'Work time'
                  :
                    'Время работы'
                }}
              </span>
              <span>
                {{
                  getDeviceInfo
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon chip">
              {{
                true ?
                  'toggle_on'
                :
                  'toggle_off'
              }}
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние телефона'
                  : settings.general.language === 'English' ?
                    'Phone state'
                  :
                    'Состояние телефона'
                }}
              </span>
              <span>
                {{
                  'Официально'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'FCC-сертификаты'
                  : settings.general.language === 'English' ?
                    'FCC certs'
                  :
                    'FCC-сертификаты'
                }}
              </span>
              <span>
                {{
                  'FCC ID: ZCASMA207F'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Номинальные значения'
                  : settings.general.language === 'English' ?
                    'Name values'
                  :
                    'Номинальные значения'
                }}
              </span>
              <span>
                {{
                  'DC 9 V; 1.67 A'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'legalInfo'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Юридическая информация'
              : settings.general.language === 'English' ?
                'Legal Info'
              :
                'Юридическая информация'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Лицензии открытого ПО'
                  : settings.general.language === 'English' ?
                    'Licenses opensource'
                  :
                    'Лицензии открытого ПО'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Правовая информация'
                  : settings.general.language === 'English' ?
                    'Law info'
                  :
                    'Правовая информация'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Лицензии системных обновлений'
                  : settings.general.language === 'English' ?
                    'Licenses of system updates'
                  :
                    'Лицензии системных обновлений'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Лицензии'
                  : settings.general.language === 'English' ?
                    'Licenses'
                  :
                    'Лицензии'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Юридические сведения'
                  : settings.general.language === 'English' ?
                    'Legal details'
                  :
                    'Юридические сведения'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Политика конфиденциальности'
                  : settings.general.language === 'English' ?
                    'Privacy politics'
                  :
                    'Политика конфиденциальности'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сведения о безопасности'
                  : settings.general.language === 'English' ?
                    'Security details'
                  :
                    'Сведения о безопасности'
                }}
              </span>
              <span>
                {{
                  getDeviceInfo
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon chip">
              {{
                true ?
                  'toggle_on'
                :
                  'toggle_off'
              }}
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версии юрид. документов'
                  : settings.general.language === 'English' ?
                    'Versions legal documents'
                  :
                    'Версии юрид. документов'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'softwareInfo'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Сведения о ПО'
              : settings.general.language === 'English' ?
                'Software info'
              :
                'Сведения о ПО'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Лицензии открытого ПО'
                  : settings.general.language === 'English' ?
                    'Licenses opensource'
                  :
                    'Лицензии открытого ПО'
                }}
              </span>
              <span>
                {{
                  settings.general.dateAndTime.fullHoursFormat ?
                    '13:00'
                  :
                    '01:00 PM'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версия OUI'
                  : settings.general.language === 'English' ?
                    'OUI version'
                  :
                    'Версия OUI'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версия OsLand'
                  : settings.general.language === 'English' ?
                    'OsLand version'
                  :
                    'Версия OsLand'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версия ядра'
                  : settings.general.language === 'English' ?
                    'Kernel version'
                  :
                    'Версия ядра'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Номер сборки'
                  : settings.general.language === 'English' ?
                    'Assembly number'
                  :
                    'Номер сборки'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние SE для OsLand'
                  : settings.general.language === 'English' ?
                    'OsLand SE state'
                  :
                    'Состояние SE для OsLand'
                }}
              </span>
              <span>
                {{
                  'Неизвестно'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem">
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версия ПО (регион/оператор)'
                  : settings.general.language === 'English' ?
                    'Версия ПО (region/provider)'
                  :
                    'Версия ПО (регион/оператор)'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon chip">
              {{
                true ?
                  'toggle_on'
                :
                  'toggle_off'
              }}
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Версия ПО безопасности'
                  : settings.general.language === 'English' ?
                    'Version soft security'
                  :
                    'Версия ПО безопасности'
                }}
              </span>
              <span>
                {{
                  'v1.0.0'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Уровень безопасности OsLand'
                  : settings.general.language === 'English' ?
                    'OsLand security level'
                  :
                    'Уровень безопасности OsLand'
                }}
              </span>
              <span>
                {{
                  'Неизвестно'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'accumulatorDetails'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Сведения об аккумуляторе'
              : settings.general.language === 'English' ?
                'Accumulator details'
              :
                'Сведения об аккумуляторе'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние аккумулятора'
                  : settings.general.language === 'English' ?
                    'Accumulator state'
                  :
                    'Состояние аккумулятора'
                }}
              </span>
              <span>
                {{
                  batteryCharging ?
                    'Заряжается'
                  :
                    'Не заряжается'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Уровень заряда батареи'
                  : settings.general.language === 'English' ?
                    'Battery level'
                  :
                    'Уровень заряда батареи'
                }}
              </span>
              <span>
                {{
                  `${batteryLevel * 100}%`
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Емкость аккумулятора'
                  : settings.general.language === 'English' ?
                    'Accumulator capacity'
                  :
                    'Емкость аккумулятора'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    '4000 мАч (стандартно)'
                  : settings.general.language === 'English' ?
                    '4000 mAh (default)'
                  :
                    '4000 мАч (стандартно)'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'simState'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Состояние SIM-карты'
              : settings.general.language === 'English' ?
                'SIM state'
              :
                'Состояние SIM-карты'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Сеть'
                  : settings.general.language === 'English' ?
                    'Network'
                  :
                    'Сеть'
                }}
              </span>
              <span>
                {{
                  'Мегафон'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние мобильной сети'
                  : settings.general.language === 'English' ?
                    'Mobile network state'
                  :
                    'Состояние мобильной сети'
                }}
              </span>
              <span>
                {{
                  'Неизвестно'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Состояние услуги'
                  : settings.general.language === 'English' ?
                    'Service state'
                  :
                    'Состояние услуги'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Работает'
                  : settings.general.language === 'English' ?
                    'Enabled'
                  :
                    'Работает'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Статус регистрации в IMS'
                  : settings.general.language === 'English' ?
                    'Registration status IMS'
                  :
                    'Статус регистрации в IMS'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    'Registered'
                  : settings.general.language === 'English' ?
                    'Зарегестрировано'
                  :
                    'Registered'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Уровень сигнала'
                  : settings.general.language === 'English' ?
                    'Signal level'
                  :
                    'Уровень сигнала'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    '4000 мАч (стандартно)'
                  : settings.general.language === 'English' ?
                    '4000 mAh (default)'
                  :
                    '4000 мАч (стандартно)'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Тип сети моб. голосовой связи'
                  : settings.general.language === 'English' ?
                    'Network type of mobile voice data'
                  :
                    'Тип сети моб. голосовой связи'
                }}
              </span>
              <span>
                {{
                  'LTE'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Тип сети мобильных данных'
                  : settings.general.language === 'English' ?
                    'Network type of mobile data'
                  :
                    'Тип сети мобильных данных'
                }}
              </span>
              <span>
                {{
                  'LTE'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'Роуминг'
                  : settings.general.language === 'English' ?
                    'Rouming'
                  :
                    'Роуминг'
                }}
              </span>
              <span>
                {{
                  'Не в роуминге'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'imeiDetails'">
        <div class="settingsAppHeader">
          <h4 :style="`font-size: calc(1em + ${settings.display.fontSize}px);`">
            {{
              settings.general.language === 'Русский' ?
                'Сведения об IMEI'
              : settings.general.language === 'English' ?
                'IMEI details'
              :
                'Сведения об IMEI'
            }}
          </h4>
        </div>
        <div class="settingsAppBody">
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'IMEI (гнездо 1)'
                  : settings.general.language === 'English' ?
                    'IMEI (port 1)'
                  :
                    'IMEI (гнездо 1)'
                }}
              </span>
              <span>
                {{
                  batteryCharging ?
                    'Заряжается'
                  :
                    'Не заряжается'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'IMEI SV (гнездо 1)'
                  : settings.general.language === 'English' ?
                    'IMEI SV (гнездо 1)'
                  :
                    'IMEI SV (гнездо 1)'
                }}
              </span>
              <span>
                {{
                  `${batteryLevel * 100}%`
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'IMEI (гнездо 2)'
                  : settings.general.language === 'English' ?
                    'IMEI (port 2)'
                  :
                    'IMEI (гнездо 2)'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    '4000 мАч (стандартно)'
                  : settings.general.language === 'English' ?
                    '4000 mAh (default)'
                  :
                    '4000 мАч (стандартно)'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
          <div class="settingsAppBodyItem" >
            <div class="settingsAppBodyItemContent">
              <span class="settingsAppBodyItemLabel">
                {{
                  settings.general.language === 'Русский' ?
                    'IMEI SV (гнездо 2)'
                  : settings.general.language === 'English' ?
                    'IMEI SV (port 2)'
                  :
                    'IMEI SV (гнездо 2)'
                }}
              </span>
              <span>
                {{
                  settings.general.language === 'Русский' ?
                    '4000 мАч (стандартно)'
                  : settings.general.language === 'English' ?
                    '4000 mAh (default)'
                  :
                    '4000 мАч (стандартно)'
                }}
              </span>
            </div>
            <span class="material-icons settingsAppWifiIcon">
              add
            </span>
          </div>
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
      accounts: [
        {
          login: 'gdlyeabkov@gmail.com',
          service: 'gmail'
        }
      ],
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
          language: 'Русский',
          dateAndTime: {
            fullHoursFormat: true
          }
        },
        deviceUsabilityAndParentControl: {
          displayTimeout: 60
        },
        display: {
          fontSize: 0,
          displayTimeout: 60,
          navigation: {
            type: 'buttons',
            buttonsOrder: 'left'
          },
          screenScale: 1
        },
        updates: {
          lastCheck: new Date().toLocaleString(),
          lastUpdate: new Date().toLocaleString()
        }
      },
      activeTab: 'settings',
      isPasswordInput: false,
      context: null,
      gestures: [],
      originX: 100,
      originY: 150,
      handleGesture: false
    }
  },
  props: {
    'appInfo': {

    },
    // 'settings',
    'launchTime': {

    },
    'soundMode': {

    },
    'brightness': {

    },
    'orientation': {

    },
    // 'battery': {
    //   level: 1,
    //   charging: false
    // }
    'batteryLevel': {

    },
    'batteryCharging': {

    }
  },
  emits: [
    'resetDisplayTimeout'
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
  computed: {
    getDeviceInfo() {
      let launchMoment = new moment(this.launchTime, 'DD.MM.YYYY, HH:mm:ss')
      let nowMoment = new moment()
      let duration = moment.duration(nowMoment.diff(launchMoment))
      let elapsedHours = duration.get('hours') >= 10 ? duration.get('hours') : `0${duration.get('hours')}`
      let elapsedMinutes = duration.get('minutes') >= 10 ? duration.get('minutes') : `0${duration.get('minutes')}`
      let elapsedSeconds = duration.get('seconds') >= 10 ? duration.get('seconds') : `0${duration.get('seconds')}`
      // alert(`Запущено ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds} назад`)
      return `Запущено ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds} назад`
    }
  },
  methods: {
    addAcount() {
      let accountLogin = 'xxx888xxx888xxx888xxx@gmail.com'
      let accountService = 'gmail'
      fetch(`http://localhost:4000/api/settings/accounsandarchieve/accounts/add/?accountlogin=${accountLogin}&accountservice=${accountService}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                    `Добавлена учетная запись`
                  : this.settings.general.language === 'English' ?
                    `Added account`
                  :
                    `Добавлена учетная запись`
                }`)

              }
            })
          }

        }
      });
    },
    giveFeedback() {
      alert('фидбек')
    },
    toggleFullHoursFormat() {
      
      let fullHoursFormat = !this.settings.general.dateAndTime.fullHoursFormat
      this.settings.general.dateAndTime.fullHoursFormat = fullHoursFormat

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/general/dateandtime/fullhoursformat/set/?full=${fullHoursFormat}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `${fullHoursFormat ? '24' : '12' }-часовой формат`
                    : this.settings.general.language === 'English' ?
                      `${fullHoursFormat ? '24' : '12' }-hours format`
                    :
                      `${fullHoursFormat ? '24' : '12' }-часовой формат`
                  }`)

              }
            })
          }

        }
      });

    },
    setShowBatteryPercents() {
      
      let showBatteryPercents = !this.settings.notifications.showBatteryPercents
      this.settings.notifications.showBatteryPercents = showBatteryPercents

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/notifications/showbatterypercents/set/?show=${showBatteryPercents}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `${showBatteryPercents ? 'Отображение' : !showBatteryPercents ? 'Скрытие' : 'Отображение' } процентов заряда`
                    : this.settings.general.language === 'English' ?
                      `${showBatteryPercents ? 'Show' : !showBatteryPercents ? 'Hide' : 'Show' } of percents battery`
                    :
                      `${showBatteryPercents ? 'Отображение' : !showBatteryPercents ? 'Скрытие' : 'Отображение' } процентов заряда`
                  }`)

              }
            })
          }

        }
      });

    },
    setScreenScale() {
      let screenScale = this.settings.display.screenScale === 1 ?
        2
      : this.settings.display.screenScale === 2 ?
        0.5
      :
        this.settings.display.screenScale === 0.5 ?
        1
      :
        1
      this.settings.display.screenScale = screenScale

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/display/screenscale/set/?screenscale=${screenScale}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `Масштабирование экрана было изменено на ${screenScale === 0.5 ? 'полэкрана' : screenScale === 1 ? 'обычный' : screenScale === 2 ? 'в 2 раза' : 'обычный' }!`
                    : this.settings.general.language === 'English' ?
                      `Screen scale was changed to ${screenScale === 0.5 ? 'splitscreen' : screenScale === 1 ? 'normal' : screenScale === 2 ? 'в 2 раза' : 'normal' }!`
                    :
                      `Масштабирование экрана было изменено на ${screenScale === 0.5 ? 'полэкрана' : screenScale === 1 ? 'обычный' : screenScale === 2 ? 'в 2 раза' : 'обычный' }!`
                  }`)

              }
            })
          }

        }
      });

    },
    setLockScreenModeToGraphicKey(lockScreenMode) {
      this.isPasswordInput = false
      this.settings.lockScreen.mode = lockScreenMode
      this.handleGesture = false
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      // fetch(`http://localhost:4000/api/settings/lockscreen/set/?lockscreenmode=${lockScreenMode}&watchstyle=${watchStyle}`, {
      fetch(`http://localhost:4000/api/settings/lockscreen/mode/set/?lockscreenmode=${lockScreenMode}&lockscreenpassword=${this.gestures.flatMap(gesture => gesture.character).join('')}`, {
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
          
          if(lockScreenMode === 'graphicKey') {
            this.drawPossibleKeys()
            this.gestures = []
          }
          
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
                // notification = new Notification(`${this.settings.general.language === 'Русский' ?
                //       `Стиль часов был сменён на ${watchStyle === 'normal' ? 'Обычный' : watchStyle === 'future' ? 'Футуризм' : watchStyle === 'outline' ? 'Обводка' : 'Обычный' }!`
                //     : this.settings.general.language === 'English' ?
                //       `Watch style was changed to ${watchStyle === 'normal' ? 'Normal' : watchStyle === 'future' ? 'Future' : watchStyle === 'outline' ? 'Outline' : 'Normal' }!`
                //     :
                //       `Стиль часов был сменён на ${watchStyle === 'normal' ? 'Обычный' : watchStyle === 'future' ? 'Футуризм' : watchStyle === 'outline' ? 'Обводка' : 'Обычный' }!`
                //   }`)
              }
            })
          }

        }
      });
    },
    drawPossibleKeys() {
      this.context.clearRect(0, 0, 500, 500)
      this.context.fillStyle = "#fff";
      this.context.beginPath();
      this.context.arc(100, 150, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(250, 150, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(400, 150, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(100, 300, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(250, 300, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(400, 300, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(100, 450, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(250, 450, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.beginPath();
      this.context.arc(400, 450, 15, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
      this.context.lineCap = 'round'
      this.context.lineJoin = 'round'
      this.context.lineWidth = 3
      this.context.strokeStyle = "rgb(0, 100, 255)";
      this.gestures.map(gesture => {
          this.context.beginPath()
          this.context.moveTo(gesture.fromX, gesture.fromY)
          this.context.lineTo(gesture.toX, gesture.toY)
          this.context.stroke()
          this.context.closePath()
      })
  },
  drawGraphicKey(event, gesture) {
      this.$emit('resetDisplayTimeout')
      let startCanvasX = this.$refs.graphicKey.offsetLeft + this.$refs.graphicKey.clientLeft
      let startCanvasY = this.$refs.graphicKey.offsetTop + this.$refs.graphicKey.clientTop
      if (gesture === 'down') {
          if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
              this.handleGesture = true
              this.originX = 100
              this.originY = 150
          } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
              this.handleGesture = true
              this.originX = 250
              this.originY = 150
          } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
              this.handleGesture = true
              this.originX = 400
              this.originY = 150
          } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
              this.handleGesture = true
              this.originX = 100
              this.originY = 300
          } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
              this.handleGesture = true
              this.originX = 250
              this.originY = 300
          } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
              this.handleGesture = true
              this.originX = 400
              this.originY = 300
          } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
              this.handleGesture = true
              this.originX = 100
              this.originY = 450
          } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
              this.handleGesture = true
              this.originX = 250
              this.originY = 450
          } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
              this.handleGesture = true
              this.originX = 400
              this.originY = 450
          }
      } else if (gesture === 'move') {
          if(this.handleGesture) {
              if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('1')) {
                      this.gestures.push({
                          character: '1',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 100,
                          toY: 150
                      })
                      this.originX = 100
                      this.originY = 150
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('2')) {
                      this.gestures.push({
                          character: '2',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 250,
                          toY: 150
                      })
                      this.originX = 250
                      this.originY = 150
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 150 - 15 && event.y <= startCanvasY + 165) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('3')) {
                      this.gestures.push({
                          character: '3',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 400,
                          toY: 150
                      })
                      this.originX = 400
                      this.originY = 150
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('4')) {
                      this.gestures.push({
                          character: '4',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 100,
                          toY: 300
                      })
                      this.originX = 100
                      this.originY = 300
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('5')) {
                      this.gestures.push({
                          character: '5',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 250,
                          toY: 300
                      })
                      this.originX = 250
                      this.originY = 300
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 300 - 15 && event.y <= startCanvasY + 315) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('6')) {
                      this.gestures.push({
                          character: '6',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 400,
                          toY: 300
                      })
                      this.originX = 400
                      this.originY = 300
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 100 - 15 && event.x <= startCanvasX + 115 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('7')) {
                      this.gestures.push({
                          character: '7',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 100,
                          toY: 450
                      })
                      this.originX = 100
                      this.originY = 450
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 250 - 15 && event.x <= startCanvasX + 265 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('8')) {
                      this.gestures.push({
                          character: '8',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 250,
                          toY: 450
                      })
                      this.originX = 250
                      this.originY = 450
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              } else if(event.x >= startCanvasX + 400 - 15 && event.x <= startCanvasX + 415 && event.y >= startCanvasY + 450 - 15 && event.y <= startCanvasY + 465) {
                  if(!this.gestures.flatMap(gesture => gesture.character).includes('9')) {
                      this.gestures.push({
                          character: '9',
                          fromX: this.originX,
                          fromY: this.originY,
                          toX: 400,
                          toY: 450
                      })
                      this.originX = 400
                      this.originY = 450
                      if(this.gestures.length >= 6) {
                        this.setLockScreenModeToGraphicKey('graphicKey')
                      }
                  }
              }
              this.context.clearRect(0, 0, 500, 500)
              this.drawPossibleKeys()
              this.context.beginPath()
              this.context.moveTo(this.originX, this.originY)
              this.context.lineTo(event.x - startCanvasX, event.y - startCanvasY)
              this.context.stroke()
              this.context.closePath();
          }
    } else if (gesture === 'up') {
      if(this.handleGesture) {
          this.handleGesture = false
          this.gestures = []
          this.drawPossibleKeys()
      }
    }
  },
  handleUnlockGesture(event, gesture) {
      this.$emit('resetDisplayTimeout')
      if(gesture === 'down') {
        this.handleGesture = true
      } else if(gesture === 'move') {
        if(this.handleGesture) {
          this.lastGesture = event.y
        }
      } else if(gesture === 'up') {
        if (this.lastGesture < 150 && this.handleGesture) {
          this.$emit('unlock')
        }
        this.handleGesture = false
      }
    },
    changeBrightness(event) {
      let brightnessPercent = Math.floor(event.x / 8)
      this.$refs.brightnessControlFiller.style = `
          background-color: rgb(100, 150, 255);
          width: ${brightnessPercent}%;
      `
      this.$refs.openedAppRef.style = `
        height: 100%;
        z-index: 10;
        width: ${this.orientation ? '50%' : '100%'};
        background-color: ${this.settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'};
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0px 15px;
        position: fixed;
        top: 0px;
        left: 0px;
        -webkit-filter: brightness(${brightnessPercent / 100});
      `
      this.$emit('changeBrightness', brightnessPercent)
      if(this.settings.notifications.enabled) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                `Яркость дисплея установлена на ${brightnessPercent}`
              : this.settings.general.language === 'English' ?
                `Display brightness setted to ${brightnessPercent}`
              :
                `Яркость дисплея установлена на ${brightnessPercent}`}`)
          }
        })
      }
    },
    setNavigationButtonsOrder() {
      let buttonsOrder = this.settings.display.navigation.buttonsOrder === 'left' ?
        'right'
      : this.settings.display.navigation.type === 'right' ?
        'left'
      :
        'left'
      this.settings.display.navigation.buttonsOrder = buttonsOrder

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/navigation/buttonsorder/set/?order=${buttonsOrder}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `Порядок кнопок навигации обновлен на ${buttonsOrder === 'left' ? 'слева направо' : 'справа налево'}`
                    : this.settings.general.language === 'English' ?
                      `Navigation buttons order changed to ${buttonsOrder === 'left' ? 'ltr' : 'rtl'}`
                    :
                      `Порядок кнопок навигации обновлен на ${buttonsOrder === 'left' ? 'слева направо' : 'справа налево'}`
                  }`)

              }
            })
          }

        }
      });
    },
    setNavigationType() {
      let navigationType = this.settings.display.navigation.type === 'buttons' ?
        'gesture'
      : this.settings.display.navigation.type === 'gesture' ?
        'buttons'
      :
        'buttons'
      this.settings.display.navigation.type = navigationType

      let buttonsOrder = this.settings.display.navigation.buttonsOrder === 'left' ?
        'right'
      : this.settings.display.navigation.type === 'right' ?
        'left'
      :
        'left'
      this.settings.display.navigation.buttonsOrder = buttonsOrder

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/navigation/type/set/?type=${navigationType}&order=${buttonsOrder}`, {
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
                
                notification = new Notification(`${this.settings.general.language === 'Русский' ?
                      `Тип навигации обновлен на ${navigationType === 'buttons' ? 'кнопки навигации' : 'жесты'}`
                    : this.settings.general.language === 'English' ?
                      `Navigation type changed to ${navigationType === 'buttons' ? 'navigation buttons' : 'gestures'}`
                    :
                      `Тип навигации обновлен на ${navigationType === 'buttons' ? 'кнопки навигации' : 'жесты'}`
                  }`)

              }
            })
          }

        }
      });
    },
    setFontSize() {
      let fontSize = this.settings.display.fontSize === 0 ?
        2
      : this.settings.display.fontSize === 2 ?
        4
      :
        this.settings.display.fontSize === 4 ?
        -4
      :
        this.settings.display.fontSize === -4 ?
        -2
      :
        this.settings.display.fontSize === -2 ?
        0
      :
        0
      this.settings.display.fontSize = fontSize

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/display/fontsize/set/?fontsize=${fontSize}`, {
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
                
                notification = new Notification(`${this.settings.display.fontSize === 'Русский' ?
                      `Размер шрифта обновлен на ${14 + fontSize}`
                    : this.settings.general.language === 'English' ?
                      `Font size was changed to ${14 + fontSize}`
                    :
                      `Размер шрифта обновлен на ${14 + fontSize}`
                  }`)

              }
            })
          }

        }
      });
    },
    setWatchStyle() {
      let watchStyle = this.settings.lockScreen.watchStyle === 'normal' ?
        'future'
      : this.settings.lockScreen.watchStyle === 'future' ?
        'outline'
      :
        'normal'
      this.settings.lockScreen.watchStyle = watchStyle

      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/lockscreen/watchstyle/set/?watchstyle=${watchStyle}`, {
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
    setLocation() {
      this.$emit('setLocation')
    },
    setConnetions() {
      alert('Задать сетевые подключения')
    },
    setSoundMode() {
      
      let newSoundMode = 1
      if(this.soundMode === 0) {
        newSoundMode = 1
      } else if(this.soundMode === 1) {
        newSoundMode = 0.1
      } else if(this.soundMode === 0.1) {
        newSoundMode = 0
      }
      if(this.settings.notifications.enabled) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                `Звуковой профиль задан на ${newSoundMode === 0 ? 'Без звука' : newSoundMode === 0.1 ? 'Вибро-режим' : newSoundMode === 1 ? 'Обычный' : 'Обычный'}`
              : this.settings.general.language === 'English' ?
                `Sound mode setted on ${newSoundMode === 0 ? 'Muted' : newSoundMode === 0.1 ? 'Vibro-mode' : newSoundMode === 1 ? 'Normal' : 'Normal'}`
              :
                `Звуковой профиль задан на ${newSoundMode === 0 ? 'Без звука' : newSoundMode === 0.1 ? 'Вибро-режим' : newSoundMode === 1 ? 'Обычный' : 'Обычный'}`
              }`)
          }
        })
      }
      this.$emit('transferSoundMode', newSoundMode)
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
      let brightnessPercent = this.brightness === 100 ?
        25
      : this.brightness === 25 ?
        50
      : this.brightness === 50 ?
        75
      : this.brightness === 75 ?
        100
      :
        100
      
      this.$refs.openedAppRef.style = `
        width: ${this.orientation ? '50%' : '100%'};
        background-color: ${this.settings.topic === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(150, 150, 150)'};
        width: 100%;
        height: 565px;
        overflow-y: scroll;
        -webkit-filter: brightness(${brightnessPercent / 100});
      `
      
      this.$emit('changeBrightness', brightnessPercent)
      if(this.settings.notifications.enabled) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            let notification = new Notification(`${this.settings.general.language === 'Русский' ?
                `Яркость дисплея установлена на ${brightnessPercent}`
              : this.settings.general.language === 'English' ?
                `Display brightness setted to ${brightnessPercent}`
              :
                `Яркость дисплея установлена на ${brightnessPercent}`}`)
          }
        })
      }
    },
    setGestures() {
      alert('Задать чувствительность движений')
    },
    setPrivacy() {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });
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
    async setLockScreenMode() {
      let lockScreenMode = this.settings.lockScreen.mode === 'moveSlide' ?
        'graphicKey'
      : this.settings.lockScreen.mode === 'graphicKey' ?
        'moveSlide'
      :
        'graphicKey'
      this.settings.lockScreen.mode = lockScreenMode
      if(lockScreenMode === 'graphicKey') {
        this.isPasswordInput = true
        this.context = this.$refs.graphicKey.getContext('2d')
        this.drawPossibleKeys()
      } else if(lockScreenMode === 'moveSlide') {
        this.setLockScreenModeToGraphicKey(lockScreenMode)
      }
    },
    setWallpapersMainScreen() {
      let mainScreen = this.settings.wallpapers.mainScreen === 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      : this.settings.wallpapers.mainScreen === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggHh6ohVL1AAaedCBDI791kA6BvC9eC4NqQ&usqp=CAU'
      :
        'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg'
      this.settings.wallpapers.mainScreen = mainScreen
      
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      
      fetch(`http://localhost:4000/api/settings/wallpapers/mainscreen/set/?mainscreen=${mainScreen}`, {
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
    setWallpapersLockScreen() {
      let lockScreen = this.settings.wallpapers.mainScreen === 'https://i.pinimg.com/originals/ba/f6/8e/baf68edfc6889408276a7679e3b4eeda.jpg' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggHh6ohVL1AAaedCBDI791kA6BvC9eC4NqQ&usqp=CAU'
      : this.settings.wallpapers.mainScreen === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU' ?
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      :
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHnIx6c3BXbeVDXE38KAZTsc-JU8Pdc8C7g&usqp=CAU'
      this.settings.wallpapers.lockScreen = lockScreen
      
      // this.settings.lockScreen.mode = lockScreenMode
      // localStorage.setItem('osland_settings', JSON.stringify(this.settings))
      fetch(`http://localhost:4000/api/settings/wallpapers/lockscreen/set/?lockscreen=${lockScreen}`, {
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
    height: 625px;
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

  .brightnessControl {
    min-width: 100%;
    background-color: rgb(255, 215, 255);
  }

  .brightnessControlFiller {
    background-color: rgb(100, 150, 255);
    width: 50%;
  }

  .brightnessFooter {
    min-width: 750px;
  }

  .chip {
    cursor: pointer;
  }

</style>