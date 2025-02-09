<template>
  <div class="wrapper">
    <section class="welcome-text">
      <h1>Мои заметки</h1>
      <h3>Не забывай о важном, храни его в облаке.</h3>
    </section>
    <img alt="" class="welcome-image" src="@/assets/welcomeImage.png"/>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1920px) {
      height: calc(100vh - 136px);
      gap: 83px;
      padding: 0px 160px;
    }
    @media (min-width: 1366px) {
      height: calc(100vh - 136px);
      min-height: 630px;
      padding: 0px 80px;
      width: auto;
    }
    @media (max-width: 1366px) {
      height: calc(100vh - 96px);
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      height: calc(100vh - 96px);
      min-width: 568px;
    }
    @media (max-width: 360px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px auto 0px;
      min-width: 320px;
      height: calc(100vh - 96px);
      min-height: 355px;
      max-height: 640px;
    }
    
    .welcome-text {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      gap: 40px;

      @media (min-width: 1920px) {
        justify-content: flex-start;
        width: 642px;
        height: 392px;
        flex: none;
      }
      @media (min-width: 1366px) {
        width: 578.67px;
        height: 392px;
        gap: 20px;
      }
      @media (max-width: 1366px){
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        height: auto;
        gap: 20px;
        margin: 0 auto;
        text-align: center;

        h3 {
          width: 90vw;
          min-width: 410px;
          max-width: 688px;
          height: 96px;
        }
      }
      @media (max-width: 360px) {
        width: 320px;
        height: auto;
        h1 {
          width: 320px;
          height: 128px;
          font-size: 60px;
          line-height: 64px;
        }
        h3 {
          width: 90vw;
          min-width: 290px;
          max-width: 320px;
          height: 72px;
          font-size: 24px;
          line-height: 36px;
          text-align: center;
        }        
      }
    }
    .welcome-image {
      position: relative;
      @media (min-width: 1920px) {
        margin: 0 auto 0 auto;
        height: 100%;
      }
      @media (min-width: 1366px) {
        width: auto;
        height: 100%;
      }
      @media (max-width: 1366px) {
        min-width: 200px;
        min-height: 287px;
        margin-bottom: auto; 
      }
      @media (max-width: 360px) {
        width: 100vw;
        min-width: 317px;
        min-height: 287px;
        margin-bottom: auto;   
      }
    }
  }
</style>

