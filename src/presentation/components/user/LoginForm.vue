<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify'

const loginProp = defineProps({
  authStore: Object,
})

// Form data
const userName = ref('')
const password = ref('')
const show_pass = ref(false)

// form extra
const is_error = ref(false)
const loading = ref(false)
const message = ref('')

async function logIn(event: SubmitEventPromise) {
  loading.value = true
  const results = await event

  // Verifica que el form sea valido
  if (!results.valid) {
    message.value = ''
    loading.value = false
    return
  }

  const messageLogIn = await loginProp.authStore?.logIn(toValue(userName), toValue(password))
  loading.value = false

  if (!loginProp.authStore?.is_authenticated) {
    message.value = messageLogIn
    is_error.value = true
  }
}

function cleanForm() {
  userName.value = ''
  password.value = ''
  message.value = ''
}

function isLoading() {
  return toValue(loading)
}

defineExpose({ cleanForm, isLoading })
</script>

<template>
  <v-form
    data-testid="form"
    validate-on="submit lazy"
    @submit.prevent="logIn"
  >
    <v-text-field
      v-model="userName"
      label="Username"
      data-testid="username"
      :rules="[
        (value: string) => {
          if (!value) return 'El Username no debe estar vació.'
          if (!isAlphaNumeric(value)) return 'El Username debe ser alfanumérico.'
          return true
        },
      ]"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      data-testid="password"
      :type="show_pass ? 'text' : 'password'"
      :append-inner-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[
        (value: string) => {
          if (!value) return 'El Password no debe estar vació.'
          return true
        },
      ]"
      required
      @click:append-inner="show_pass = !show_pass"
    />
    <v-alert
      v-if="message"
      class="mt-4 mb-4"
      data-testid="alertLogin"
      :type="is_error ? 'warning' : 'success'"
    >
      {{ message }}
    </v-alert>
    <v-btn
      :loading="loading"
      data-testid="btnLogin"
      class="mt-2"
      text="Iniciar sesión"
      type="submit"
      size="x-large"
      color="purple-darken-3"
      block
    />
  </v-form>
</template>
