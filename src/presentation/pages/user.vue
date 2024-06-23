<script setup>
const authStore = useAuthStore()
</script>

<template>
  <NuxtLayout>
    <template #header>
      <Header
        :auth-store="authStore"
      />
    </template>
    <template #default>
      <Breadcrumb />
      <v-container class="pa-4 text-center" />
    </template>
    <template #footer>
      <Footer />
    </template>
  </NuxtLayout>
</template>
