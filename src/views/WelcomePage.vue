<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import MainPage from "../components/MainPage.vue"

const showAlert = ref(false);
const alertMessage = ref('');

onMounted(() => {
  const message = sessionStorage.getItem('alertMessage');
  if (message) {
    alertMessage.value = message;
    showAlert.value = true;
    sessionStorage.removeItem('alertMessage');

    setTimeout(() => {
      showAlert.value = false;
    }, 4000);
  }
});
</script>

<template>
  <main>
    <MainPage/>
    <div class="alert-wrapper" v-if="showAlert">
      <div class="custom-alert">
        <label class="text-small">{{ alertMessage }}</label>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.alert-wrapper {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;

  .custom-alert {
    position: relative;
    height: auto;
    width: 400px;
    height: 100px;
    border-radius: 20px;
    padding: 24px;
    gap: 40px;
    background: var(--color-dark-middle);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 0 46px rgb(0, 0, 0, .6);

    h2 {
      width: auto;
      @media (max-width: 360px) {
        font-size: 24px;
        line-height: 32px;
      }
    }
    label {
      width: auto;
      height: auto;
      color: var(--color-gray);
      @media (max-width: 360px) {
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        
      }
    }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(40px);
    }
  }
  .custom-alert.hide {
    animation: slideOut 0.4s ease-out forwards;
  }

}
</style>