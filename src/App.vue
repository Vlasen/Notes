<script lang="ts" setup>
import Header from "@/components/Header.vue"

const accessToken = sessionStorage.setItem('accessToken', '');
</script>


<template>
  <header>
    <Header/>
  </header>

  <main>
    <router-view/>
  </main>
</template>