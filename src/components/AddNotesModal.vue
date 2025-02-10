<script lang="ts" setup>
import type { PropType  } from 'vue'
import { reactive, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['getNotes']);

const props = defineProps({
  closeAddNotesModal: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  },
});

const state = reactive({
  isLoading: false,
  notesTitle: {
    title: '',
    error: '',
  },
  notesContent: {
    content: '',
    error: '',
  },
})

const addNotes = async (event: MouseEvent, title: string, content: string) => {
  state.isLoading = true;
  state.notesTitle.error = '';
  state.notesContent.error = '';
  const accessToken = ref(localStorage.getItem('accessToken'));
  
  try {
    const response = await axios.post('https://dist.nd.ru/api/notes', {
      title: title,
      content: content
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.value}`
      }
    });

    console.log("Заметка добавлена", response);
    emit('getNotes');
    props.closeAddNotesModal(event);
  } catch (error: any) {
    console.error("Ошибка при добавлении:", error);

    if (error.response.data.message) {
      for (const message of error.response.data.message) {
        if (message.includes('Заголовок')) {
          state.notesTitle.error = message;
        } else if (message.includes('Содержимое')) {
          state.notesContent.error = message;
        };
      };
    };
  } finally {
    state.isLoading = false;
  }
};
</script>

<template>
  <article class="modal-overlay" @mouseup="props.closeAddNotesModal($event)">
    <section class="modal-content" @mouseup.stop>
      <button class="close-btn" @click="props.closeAddNotesModal($event)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <h2>Добавление заметки</h2>

      <form>
        <div class="wrapper">
          <label class="text-small" for="title">Название заметки</label>
          <div class="input-box">
            <input v-model="state.notesTitle.title"
              type="text"
              id="title"
              placeholder="Название заметки"
              required 
            />
          </div>

          <div class="info-error">
            <div class="input-invalid" v-if="state.notesTitle.error">
              {{ state.notesTitle.error }}
            </div>
            <div class="symbols-number" >
              <label class="text-small" 
                :class="{'input-invalid': state.notesTitle.title.length > 64}"
              >
                {{ state.notesTitle.title.length }}/64
              </label>
            </div>
          </div>
        </div>

        <div class="wrapper">
          <label class="text-small" for="content">Текст заметки</label>
          <div class="input-box">
            <textarea v-model="state.notesContent.content"
              placeholder="Введите текст"
              id="conent"
              required 
            />
          </div>

          <div class="info-error">
            <div class="input-invalid" v-if="state.notesContent.error">
              {{ state.notesContent.error }}
            </div>
            <div class="symbols-number">
              <label class="text-small"
                :class="{'input-invalid': state.notesContent.content.length > 255}"
              >
                {{ state.notesContent.content.length }}/255
              </label>
            </div>
          </div>
        </div>

      </form> 
      
      <footer>
        <section>
          <button class="add-notes-btn"
            @click="addNotes($event, state.notesTitle.title, state.notesContent.content)">
            <label class="text-normal">
              Добавить
            </label>
          </button>
        </section>  
      </footer>
    </section>
  </article>

  <article class="circle-loading-wraper" v-if="state.isLoading">
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path fill="rgba(177, 201, 9, 1)" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="rgba(177, 201, 9, 1)" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
  </article>
</template>

<style lang="css" scoped>
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
        min-width: 300px;
        height: auto;
        min-height: 625px;
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
          padding: 0 24px;
        }
        .input-box {
          position: relative;
          gap: 24px;

          @media (max-width: 360px) {
            gap: 16px;
          }
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
        
        textarea {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 16px 24px;
          width: 100%;
          height: 244px;
          border-radius: 36px;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          resize: none;
          @media (max-width: 1366px) {
            height: 168px;
          }
        }
        textarea::placeholder {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--color-gray);
        }
        textarea:hover {
          border: solid 2px var(--color-green-light);
        }
        textarea:focus {
          border: solid 2px var(--color-green-light);
          outline: none;
        }

        .info-error {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .input-invalid {
            padding: 0 24px;
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            color: var(--color-red-invalid) !important;
            @media (max-width: 360px) {
              font-size: 16px;
            }
          }
          .symbols-number {
            margin-left: auto;
            text-align: right;
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
        justify-content: flex-end;
        width: 100%;
        height: auto;
        gap: 12px;

        @media (max-width: 360px) {
          flex-direction: column;
          gap: 12px;
        }

        .add-notes-btn {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 0px 24px;
          gap: 12px;
          width: 150px;
          height: 56px;
          border-radius: 32px;

          @media (max-width: 360px) {
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
    }
  }
}
</style>