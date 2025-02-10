<script setup lang="ts">
import { reactive } from 'vue'
import type { PropType  } from 'vue'
import axios from 'axios'

const props = defineProps({
  openLoginModal: {
    type: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
    required: true,
  },
  closeModal: {
    type: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
    required: true
  },
  getType: {
    type: Function,
    required: true,
  },
  togglePassword: {
    type: Function,
    required: true,
  },
});

const state = reactive({
  isLoading: false,
  registrationError: '',
  registrationStatus: '',
  inputData: [{
      label: 'Email',
      input: '',
      error: '',
      placeholder: 'Введите Email',
      isVisibleEye: false,
    },
    {
      label: 'Пароль',
      input: '',
      error: '',
      placeholder: 'Введите пароль',
      isVisibleEye: false,
    },
    {
    label: 'Пароль еще раз',
    input: '',
    error: '',
    placeholder: 'Введите пароль',
    isVisibleEye: false,
  }],
});

const validateInput = (inputData: typeof state.inputData): boolean => {
  let isValid = true;

  const passwordField = inputData.find((data: any) => data.label === 'Пароль');
  const confirmPasswordField = inputData.find((data: any) => data.label === 'Пароль еще раз');

  if (!passwordField || !confirmPasswordField) {
    console.error("Ошибка: поля 'Пароль' или 'Пароль еще раз' не найдены.");
    return false;
  }

  for (const data of inputData) {
    data.error = '';
    if (!data.input) {
      data.error = 'Поле не может быть пустым';
      isValid = false;
    } 

    if (passwordField.input && confirmPasswordField.input) {
      if (passwordField.input !== confirmPasswordField.input) {
        confirmPasswordField.error = "Пароли не совпадают";
        isValid = false;
      }
    };
  }
  return isValid;
};

const registeration = async (event: MouseEvent | KeyboardEvent, inputData: any): Promise<void> => {
  if (!validateInput(state.inputData)) return;
  
  state.isLoading = true;
  state.registrationError = '';
  state.registrationStatus = '';

  const emailField = inputData.find((data: any) => data.label === 'Email');
  const passwordField = inputData.find((data: any) => data.label === 'Пароль');
  const confirmPasswordField = inputData.find((data: any) => data.label === 'Пароль еще раз');

  try {
    await axios.post('https://dist.nd.ru/api/reg', {
      email: emailField.input,
      password: passwordField.input,
      confirm_password: confirmPasswordField.input
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    state.registrationStatus = 'Вы зарегистрированы!';

    setTimeout(() => {
      props.openLoginModal(event);
    }, 1000);
    
  } catch (error: any) {
    console.error("Ошибка при регистрации:", error);
    if (error.message) {
      state.registrationError = error.message;
    };

    if (error.response.data.message) {
      for (const message of error.response.data.message) {
        if (message.includes('адрес')) {
          const emailField = inputData.find((data: any) => data.label === 'Email');
          emailField.error = message;
        }
        if (message.includes('Пароль')) {
          const passwordField = inputData.find((data: any) => data.label === 'Пароль');
          passwordField.error = message;
        }
      }
    } 
    if (error.status == 409) {
      state.registrationError = error.response.data.message;
    }
    if (error.status == 400) {
      state.registrationError = '';
    }
    
  } finally {
    state.isLoading = false;
  }
};

</script>

<template>
  <article class="modal-overlay" @mouseup="closeModal($event)">
    <div class="modal-content" @mouseup.stop>
      <button class="close-btn" @click="props.closeModal($event)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <h2>Регистрация</h2>

      <form @keyup.enter="registeration($event, state.inputData)">
        <div class="wrapper" v-for="data in state.inputData">
          <label class="text-small">{{ data.label }}</label>
          <div class="input-box">
            <input v-model="data.input"
              :type="props.getType(data).value"
              :placeholder=data.placeholder
              required 
            />

            <div class="eye-icon-wrapper" v-if="data.label.includes('Пароль')">
              <svg 
                v-if="!data.isVisibleEye" 
                @click="props.togglePassword(data)" 
                width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7C17 8.15478 16.2206 9.64926 14.7228 10.9006C13.2537 12.128 11.2258 13 9 13C6.77424 13 4.7463 12.128 3.27718 10.9006C1.77936 9.64926 1 8.15478 1 7C1 5.84522 1.77936 4.35074 3.27718 3.09941C4.7463 1.87204 6.77424 1 9 1C11.2258 1 13.2537 1.87204 14.7228 3.09941C16.2206 4.35074 17 5.84522 17 7Z" stroke="#B1C909" stroke-width="2"/>
                <circle cx="9" cy="7" r="3" stroke="#B1C909" stroke-width="2"/>
              </svg>
              <svg 
                v-if="data.isVisibleEye" 
                @click="props.togglePassword(data)" 
                width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C17 9.15478 16.2206 10.6493 14.7228 11.9006C13.2537 13.128 11.2258 14 9 14C6.77424 14 4.7463 13.128 3.27718 11.9006C1.77936 10.6493 1 9.15478 1 8C1 6.84522 1.77936 5.35074 3.27718 4.09941C4.7463 2.87204 6.77424 2 9 2C11.2258 2 13.2537 2.87204 14.7228 4.09941C16.2206 5.35074 17 6.84522 17 8Z" stroke="#B1C909" stroke-width="2"/>
                <circle cx="9" cy="8" r="3" stroke="#B1C909" stroke-width="2"/>
                <path d="M2 1L16 15" stroke="#B1C909" stroke-width="2"/>
              </svg>
            </div>
          </div>

          <div class="input-invalid" v-if="data.error">
            {{ data.error }}
          </div>
        </div>
      </form> 
      
      <footer>
        <section>
          <div class="label-wrapper">
            <label class="text-small">
              У вас есть аккаунт?
            </label>
            <a href="#" @click="props.openLoginModal($event)">Войдите</a>
          </div>
          <button class="login-btn" @click="registeration($event, state.inputData)">
            <label class="text-normal">
              Зарегистрироваться
            </label>
          </button>
        </section>  
        <div class="status-message"v-if="state.registrationError || state.registrationStatus">
          <div class="error-message" v-if="state.registrationError">
            <label class="text-small error-text">
              {{ state.registrationError }}
            </label> 
          </div>
          <div class="success-message" v-if="state.registrationStatus">
            <label class="text-small success-text">
              {{ state.registrationStatus }}
            </label> 
          </div>
        </div>

      </footer>
    </div>
  </article>
  <article class="circle-loading-wraper" v-if="state.isLoading">
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path fill="rgba(177, 201, 9, 1)" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="rgba(177, 201, 9, 1)" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
  </article>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(10, 31, 56, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    padding: 80px;
    gap: 40px;
    border-radius: 40px;
    background: var(--color-dark-middle);
    text-align: center;

    @media (max-width: 1366px) {
      padding: 56px;
      min-width: 580px;
    }
    @media (max-width: 768px) {
      min-width: 350px;
    }
    @media (max-width: 500px) {
      width: 90%;
      padding: 24px 24px;
    }
    @media (max-width: 360px) {
      position: fixed;
      top: 4px;
      left: 4px;
      bottom: 4px;
      right: 4px;
      height: 100vh;
      min-width: 342px;
      min-height: 620px;
      overflow-y: auto;
      padding: 24px 16px;
      margin: 4px;
      gap: 28px;
      -webkit-overflow-scrolling: touch;
    }

    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 56px;
      border-radius: 32px;
      border: none;
    }

    h2 {
      text-align: left;
      @media (max-width: 1366px) {
        width: 100%;
        min-width: 300px;
        height: auto;
      }
      @media (max-width: 500px) {
        font-weight: 600;
        font-size: 32px;
        line-height: 36px;
      }

    }
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 24px;
      @media (max-width: 360px) {
        gap: 16px;
      }

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        gap: 8px;
        width: 100%;

        label {
          color: var(--color-gray) !important;
          padding: 0 24px;
          width: 100%;
        }
        .input-box {
          position: relative;
        }
        input {
          padding: 0 58px 0 28px;
          width: 100%;
          height: 72px;
          background: var(--color-white);
          border-radius: 36px;
          border: solid 2px var(--color-dark);
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--color-dark);
          transition: border-color 0.2s ease;
        }
        input::placeholder {
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--color-gray);
        }
        input:hover {
          border: solid 2px var(--color-green-light);
        }
        input:focus {
          border: solid 2px var(--color-green-light);
          outline: none;
        }
        .eye-icon-wrapper svg {
          position: absolute;
          right: 29px;
          bottom: 28px;
          cursor: pointer;
        }
        
        .input-invalid {
          padding: 0 24px;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--color-red-invalid);
          @media (max-width: 500px) {
            font-size: 16px;
          }
        }
      }
    }
    footer {
      display: flex;
      flex-direction: column;
      gap: 20px;
      section {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: auto;
        gap: 12px;
        
        @media (max-width: 600px) {
          flex-direction: column;
          gap: 12px;
        }

        .label-wrapper {
          display: flex;
          flex-direction: row;
          text-align: left;
          width: 100%;
          gap: 4px;
          flex-wrap: wrap;
          
          @media (max-width: 768px) {
            flex-direction: row;
          }
          @media (max-width: 600px) {
            flex-direction: row;
            justify-content: center;
            flex-wrap: nowrap;
            order: 2;
          }
          
          label {
            display: flex;
            flex-direction: row;    
            width: auto;
            text-align: left;
            white-space: nowrap;
            color: var(--color-gray) !important;
            @media (max-width: 360px) {
              font-size: 14px !important;
              line-height: 24px !important;
            }
          }
          a {
            width: auto;
            @media (max-width: 360px) {
              font-size: 14px !important;
              line-height: 24px !important;
            }
          }
        }
        .login-btn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 12px;
          width: 267px;
          height: 56px;
          border-radius: 32px;
          @media (max-width: 600px) {
            width: 100%;
            height: 56px;
            flex: none;
            order: 1;
            align-self: stretch;
          }

          label {
            cursor: pointer;
          }
        }
      }
      .status-message {
        .error-message {
          width: 100%;
          height: auto;
          padding: 8px 20px;
          gap: 8px;
          background: var(--color-red-dark-invalid);
          border-radius: 24px;
          text-align: left;

          @media (max-width: 1000px) {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .error-text {
            width: 580px;
            height: auto;

            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            color: var(--color-red-invalid);
          }
        }
        .success-message {
          width: 100%;
          height: auto;
          padding: 8px 20px;
          gap: 8px;
          background: rgba(129, 148, 0, .3);
          border-radius: 24px;
          text-align: left;

          @media (max-width: 1000px) {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .success-text {
            width: 580px;
            height: auto;

            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            color: var(--color-green-light);
          }
          
          
        }
      }
    }
  }
}
</style>