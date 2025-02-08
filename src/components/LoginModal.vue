<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PropType  } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'

const router = useRouter();

const props = defineProps({
  openRegistrationModal: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  },
  closeModal: {
    type: Function as PropType<(event: MouseEvent) => void>,
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
  loginUser: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  },

});

const state = reactive({
  isLoading: false,
  loginError: '',
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
    }],
});

const validateInput = (inputData: typeof state.inputData): boolean => {
  let isValid = true;
  for (const data of inputData) {
    data.error = '';
    if (!data.input) {
      data.error = 'Поле не может быть пустым';
      isValid = false;
    }
  }
  return isValid;
};

const authUser = async (event: MouseEvent, inputData: any): Promise<void> => {
  if (!validateInput(inputData)) return;

  state.isLoading = true;
  state.loginError = '';

  const emailField = inputData.find((data: any) => data.label === 'Email');
  const passwordField = inputData.find((data: any) => data.label === 'Пароль');

  try {
    const response = await axios.post('https://dist.nd.ru/api/auth', {
      email: emailField.input,
      password: passwordField.input
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log("Авторизация успешна", response);
    props.loginUser(event);
    props.closeModal(event);
    localStorage.setItem('accessToken', '');
    localStorage.setItem('accessToken', response.data.accessToken);
    console.log(localStorage.getItem('accessToken'))

    router.push('/my-notes');
  } catch (error: any) {
    console.error("Вход не выполнен", error);
    if (error.message) {
      state.loginError = error.message;
    };
    if (error.response.data.message) {
      state.loginError = error.response.data.message;
    } else {
      state.loginError = error.message;
    }
    
  //   if (error.status == 404) {
      
  //   }
  //   if (error.status == 400) {
  //     if (error.response.data.message == 'Невалидный адрес электронной почты') {
  //       emailField.error = error.response.data.message[0];
  //     } else {
  //       passwordField.error = error.response.data.message[0];
  //     }
  //   }
  } finally {
    state.isLoading = false;
  }
};
</script>

<template>
  <article class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal($event)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <h2>Вход в ваш аккаунт</h2>

      <form v-for="data in state.inputData">
        <div class="wrapper">
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
              У вас нет аккаунта?
            </label>
            <a href="#" @click="openRegistrationModal($event)">Зарегистрируйтесь</a>
          </div>
          <button class="login-btn" @click="authUser($event, state.inputData)">
            <label class="text-normal">
              Войти
            </label>
          </button>
        </section>  
        <div class="error-message" v-if="state.loginError">
          <label class="text-small">
            {{ state.loginError }}
          </label> 
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
  width: 100vw;
  height: 100vh;
  background: rgb(10, 31, 56, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 780px;
    width: 70%;
    height: auto;
    padding: 80px;
    gap: 40px;
    border-radius: 40px;
    background: var(--color-dark-middle);
    text-align: center;

      @media (max-width: 1366px) {
        padding: 56px;
      }
      @media (max-width: 768px) {
        width: 90%;
        min-width: 440px;
      }
      @media (max-width: 360px) {
        position: fixed;
        top: 4px;
        left: 4px;
        bottom: 4px;
        right: 4px;
        width: auto;
        min-width: 350px;
        height: auto;
        min-height: 580px;
        padding: 24px 16px;
        margin: 4px;
        gap: 28px;
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
      @media (max-width: 360px) {
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
        svg {
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
        @media (max-width: 360px) {
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
          @media (max-width: 1366px) {
            flex-direction: column;
          }
          @media (max-width: 768px) {
            flex-direction: row;
          }
          @media (max-width: 360px) {
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
          padding: 0px 24px;
          gap: 12px;
          width: 114px;
          height: 56px;
          border-radius: 32px;
          @media (max-width: 360px) {
            width: 320px;
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

        label {
          width: 580px;
          height: auto;

          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--color-red-invalid);
        }
      }
    }
  }
}
.circle-loading-wraper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(10, 31, 56, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>