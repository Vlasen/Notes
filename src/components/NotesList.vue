<script lang="ts" setup>
import type {PropType} from 'vue';

interface Note {
  id: number
  title: string
  content: string
};

const props = defineProps({
  notes: {
    type: Array as PropType<Note[]>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'deleteNote', noteId: number): void
}>()

</script>

<template>
  <article class="notes-list">
    <div class="note-wraper" v-for="note in props.notes">
      <div class="note-title">
        <h4>{{ note.title }}</h4>
      </div>
      <div class="note-content">
        <label class="text-normal">{{ note.content }}</label>
      </div>
      <div class="delete-btn-wrapper">
        <div class="delete-btn" @click="emit('deleteNote', note.id)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <label class="text-normal">Удалить</label>
        </div>
      </div>
      <div class="triangle"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.notes-list {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  align-items: start;
  padding: 40px 160px;
  gap: 40px;

  @media (max-width: 1366px) {
    gap: 20px;
    padding: 40px 80px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  @media (max-width: 768px) {
    padding: 40px;
    grid-template-columns: repeat(1, minmax(220px, 1fr));
  }
  @media (max-width: 360px) {
    padding: 20px;
  }
  .note-wraper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    min-width: 320px;
    max-width: 500px;
    height: auto;
    min-height: 240px;
    box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    background: var(--color-green-light);
    clip-path: polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%);

    @media (max-width: 1366px) {
      min-width: 260px;
      max-width: 388.6px;
    }
    @media (max-width: 768px) {
      width: 100%;
      min-width: 220px;
      max-width: 688px;
    }

    .note-title {
      width: 100%;
      height: auto;
      padding: 20px 56px 20px 28px;
      border-bottom: 1px dotted var(--color-green-middle);

      h4{
        width: 100%;
        height: auto;
        word-wrap: break-word;
        @media (max-width: 360px) {
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
        }
      }
    }
    .note-content {
      width: 100%;
      max-height: 220px;
      padding: 20px 28px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      text-overflow: ellipsis;  
      line-clamp: 6;
      white-space: normal;
      color: var(--color-white);

      @media (max-width: 360px) {
        max-height: 160px;
      }

      label {
        width: 100%;
        height: auto;
        max-height: 220px;
        word-wrap: break-word;
        @media (max-width: 360px) {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
    .delete-btn-wrapper {
      margin-top: auto;
      display: flex;
      align-items: center;
      width: 100%;
      height: 72px;
      gap: 8px;
      padding: 8px;

      .delete-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 163px;
        height: 56px;
        padding: 0 24px;
        margin-left: auto;
        gap: 12px;
        cursor: pointer;
        svg {
          flex-shrink: 0;
          cursor: pointer;
        }
        label {
          cursor: pointer;
        }
      }
    }
    .triangle {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      background: var(--color-green);
      border-radius: 0 12px;
      clip-path: polygon(0 0, 100% 100%, 0 100%);
    }
  }
}

</style>