<script setup>
const authStore = useAuthStore()

// Form data
const modeCreate = ref(false)
const userLoginForm = ref(null)
const userCreateForm = ref(null)
const loading = ref(false)

function changeMode() {
  if (userLoginForm.value?.isLoading()) return
  if (userCreateForm.value?.isLoading()) return
  if (modeCreate.value) userLoginForm.value?.cleanForm()
  else userCreateForm.value?.cleanFom()
  modeCreate.value = !modeCreate.value
}

const buttonChangeTitle = computed(() => {
  return modeCreate.value ? 'Ir a iniciar sesión' : 'Ir a crear un usuario'
})

// Redirigir para no ver el login
if (import.meta.client) {
  if (authStore.is_authenticated) {
    navigateTo('/')
  }
}
</script>

<template>
  <NuxtLayout>
    <template #header />
    <template #default>
      <v-container class="h-100 d-flex">
        <v-row>
          <v-col class="d-flex align-self-center">
            <v-sheet
              class="mx-auto"
              min-width="500"
              rounded="lg"
            >
              <UserLoginForm
                v-if="!modeCreate"
                ref="userLoginForm"
                :auth-store="authStore"
              />
              <UserCreateForm
                v-else
                ref="userCreateForm"
                :auth-store="authStore"
              />
              <v-divider
                :thickness="2"
                color="purple-darken-4"
                class="mt-8 mb-8 border-opacity-50"
              />
              <v-btn
                :loading="loading"
                variant="plain"
                class="mt-2"
                block
                @click="changeMode()"
              >
                {{ buttonChangeTitle }}
                <v-icon
                  color="purple-darken-4"
                  icon="mdi-chevron-right"
                />
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </NuxtLayout>
</template>
