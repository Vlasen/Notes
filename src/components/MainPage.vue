<script lang="ts" setup>

</script>

<template>
  <div class="wrapper">
    <section class="welcomeText">
      <h1>Мои заметки</h1>
      <h3>Не забывай о важном, храни его в облаке.</h3>
    </section>
    <img alt="" class="welcomeImage" src="@/assets/welcomeImage.png"/>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    @media (max-width: 1920px) or (min-width: 1920px) {
      height: calc(100vh - 136px);
      gap: 83px;
      padding: 0px 160px;
    }
    @media (max-width: 1366px) {
      height: calc(100vh - 96px);
      padding: 0px 80px;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 96px);
      min-height: 600px;
      gap: 20px;
      margin: 0 auto;
    }
    @media (max-width: 360px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px auto 0px;

      width: 360px;
      height: calc(100vh - 96px);
      min-height: 355px;
      max-height: 640px;
    }
    
    section {
      position: absolute;
      display: flex;
      flex-direction: column;
      flex: none;
      margin: 0 auto;

      @media (max-width: 1920px) or (min-width: 1920px) {
        justify-content: flex-start;
        width: 642px;
        height: 392px;
        gap: 40px;
      }
      @media (max-width: 1366px) {
        width: 578.67px;
        height: 392px;
      

      }
      @media (max-width: 768px) {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        height: auto;
        gap: 20px;
        margin: 0 auto;
        text-align: center;

        h3 {
          width: 688px;
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
          width: 320px;
          height: 72px;

          font-size: 24px;
          line-height: 36px;
          text-align: center;
        }        
      }
    }
    .welcomeImage {
      @media (max-width: 1920px) or (min-width: 1920px) {
        position: absolute;
        left: 50%;
        transform: translateX(-10%);
        bottom: 0;
        margin: 0 auto -10px auto;
        height: 100%;
        max-width: auto;
        object-fit: contain;
      }
      @media (max-width: 1366px) {
        // width: auto;
        height: 604px;
      }
      @media (max-width: 768px) {
        position: relative;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        width: 560.85px;
        height: 60%;
        min-height: 540px;
        margin: 0 auto;   
      }
      @media (max-width: 360px) {
        
        width: 298.08px;
        height: 60%;
        min-height: 287px;
        margin: 0 auto;

      }
    }
    
  }
</style>

