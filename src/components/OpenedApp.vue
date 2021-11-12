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
                Диплей
              </span>
              <span>
                Яркость, Главный экран
              </span>
            </div>
            <span class="material-icons settingsAppDisplayIcon">
              light_mode
            </span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenedApp',
  props: [
    'appInfo'
  ]
}
</script>
<style scoped>
  .settingsApp {
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
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
    overflow-y: scroll;
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

</style>