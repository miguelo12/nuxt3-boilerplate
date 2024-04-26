<script setup lang="ts">
const data_prop = defineProps({
  title: String,
})
const counter = ref(0)
const nuxtApp = useNuxtApp()
</script>

<template>
  <button @click="counter++">
    Count Up!!
  </button>
  <div data-testid="counter">
    {{ counter }}
  </div>
  <div data-testid="title">
    {{ data_prop.title }}
  </div>
  <div data-testid="nuxt-version">
    {{ nuxtApp.versions.nuxt }}
  </div>
</template>
