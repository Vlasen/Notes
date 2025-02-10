<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import AddNotesModal from '../components/AddNotesModal.vue';
import NotesList from '../components/NotesList.vue';

interface Note {
  id: number,
  title: string,
  content: string,
};

interface State {
  showAddNotesModal: Boolean,
  isLoading: Boolean,
  notesResult: Note[],
  accessToken: String | null,
};

const state = reactive<State>({
  showAddNotesModal: false,
  notesResult: [],
  isLoading: false,
  accessToken: (localStorage.getItem('accessToken')) ? localStorage.getItem('accessToken') : '',
});

const getNotes = async () => {
  state.isLoading = true;
  try {
    const response = await axios.get('https://dist.nd.ru/api/notes', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${state.accessToken}`
      }
    });

    console.log("Заметки получены", response);
    state.notesResult = response.data as Note[];

  } catch (error: any) {
    console.error("Ошибка при добавлении:", error);
  } finally {
    state.isLoading = false;
  }
};

const deleteNote = async (noteId: number) => {
  state.isLoading = true
  try {
    await axios.delete(`https://dist.nd.ru/api/notes/${noteId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${state.accessToken}`
      }
    })

    state.notesResult = state.notesResult.filter(note => note.id !== noteId)
  } catch (error) {
    console.error('Ошибка при удалении заметки', error)
  } finally {
    state.isLoading = false
  }
}

const openAddNotesModal = (event: MouseEvent) => {
  state.showAddNotesModal = true;
};
const closeAddNotesModal = (event: MouseEvent) => {
  state.showAddNotesModal = false;
};

onMounted(() => {
  getNotes();
});
</script>

<template>
  <NotesList :notes="state.notesResult"
  @deleteNote="deleteNote"/>
  <AddNotesModal v-if="state.showAddNotesModal"
    :closeAddNotesModal="closeAddNotesModal"
    @getNotes="getNotes"
  />

  <article>
    <button class="add-btn" @click="openAddNotesModal($event)">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9H17M9 1L9 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </article>

  <article class="circle-loading-wraper" v-if="state.isLoading">
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path fill="rgba(177, 201, 9, 1)" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5"/><path fill="rgba(177, 201, 9, 1)" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
  </article>
</template>

<style lang="scss" scoped>

.add-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  height: 56px;
  width: 56px;
  border-radius: 30px;
  box-shadow: 0 0 46px rgba(0, 0, 0, 0.6);
  .svg-btn {
    cursor: pointer;
  }
}
</style>