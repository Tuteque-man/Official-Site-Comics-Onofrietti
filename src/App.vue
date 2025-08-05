<script setup>
import { ref } from 'vue'
import MenuBar from './components/MenuBar.vue'
import Footer from './components/Footer.vue'

const isLightMode = ref(false)
</script>

<template>
  <div id="app">
    <MenuBar :isLightMode="isLightMode" />
    <main class="content-wrapper">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :isLightMode="isLightMode" @update:isLightMode="isLightMode = $event" />
      </router-view>
    </main>
    <Footer :isLightMode="isLightMode" />
  </div>
</template>

<style>
/* Importar fuentes primero */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Estilos globales para tu aplicación */
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.content-wrapper {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
