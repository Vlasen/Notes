<script lang="ts" setup>
import { reactive, ref } from 'vue'
import AddNotesModal from '@/components/AddNotesModal.vue';
import NotesList from '@/components/NotesList.vue';


const state = reactive({
  showAddNotesModal: false,
});

const openAddNotesModal = (event: MouseEvent) => {
  state.showAddNotesModal = true;
};
const closeAddNotesModal = (event: MouseEvent) => {
  state.showAddNotesModal = false;
};


</script>

<template>
  <NotesList/>
  <AddNotesModal v-if="state.showAddNotesModal"
    :closeAddNotesModal="closeAddNotesModal"
  />

  <article>
    <button class="add-btn" @click="openAddNotesModal($event)">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9H17M9 1L9 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
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