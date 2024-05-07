<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify'

const createProp = defineProps({
  authStore: Object,
})

// Form data
const userName = ref('')
const password = ref('')
const rePassword = ref('')
const show_pass = ref(false)

// form extra
const is_error = ref(false)
const loading = ref(false)
const message = ref('')

async function userCreate(event: SubmitEventPromise) {
  loading.value = true
  const results = await event

  // Verifica que el form sea valido
  if (!results.valid) {
    message.value = ''
    loading.value = false
    return
  }

  const dataUser = await createProp.authStore?.createUser(userName.value, password.value)
  message.value = dataUser.message
  is_error.value = dataUser.is_failed
  loading.value = false

  cleanForm(false)
}

function cleanForm(removeMessage = true) {
  userName.value = ''
  password.value = ''
  message.value = ''
  rePassword.value = ''
  if (removeMessage) message.value = ''
}

function isLoading() {
  return loading.value
}

defineExpose({ isLoading, cleanForm })
</script>

<template>
  <v-form
    validate-on="submit lazy"
    @submit.prevent="userCreate"
  >
    <v-text-field
      v-model="userName"
      label="Username"
      :rules="[
        (value: string) => {
          if (!value) return 'El Username no debe estar vació.'
          if (!isAlphaNumeric(value)) return 'El Username puede ser alfanumérico.'
          return true
        },
      ]"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      :type="show_pass ? 'text' : 'password'"
      :append-inner-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[
        (value: string) => {
          if (!value) return 'El Password no debe estar vació.'
          if (value.length <= 6) return 'El Password debe ser mayor o igual a 6 caracteres'
          if (!isAlphaNumericSpecial(value)) return 'El Password puede ser alfanumérico y !@#*'
          return true
        },
      ]"
      required
      @click:append-inner="show_pass = !show_pass"
    />
    <v-text-field
      v-model="rePassword"
      label="Re-Password"
      :type="show_pass ? 'text' : 'password'"
      :append-inner-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[
        (value) => {
          if (!value) return 'El Re-Password no debe estar vació.'
          if (value !== password) return 'El password y el Re-Password no es el mismo.'
          return true
        },
      ]"
      required
      @click:append-inner="show_pass = !show_pass"
    />
    <v-alert
      v-if="message"
      class="mt-4 mb-4"
      :type="is_error ? 'warning' : 'success'"
    >
      {{ message }}
    </v-alert>
    <v-btn
      :loading="loading"
      class="mt-2"
      text="Crear usuario"
      type="submit"
      size="x-large"
      color="purple-darken-3"
      block
    />
  </v-form>
</template>
