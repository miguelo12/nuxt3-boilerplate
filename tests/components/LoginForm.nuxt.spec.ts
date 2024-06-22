import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LoginForm from '~/components/user/LoginForm.vue'

global.ResizeObserver = require('resize-observer-polyfill')

const vuetify = createVuetify({
  components,
  directives,
})

describe('LoginForm.vue', async () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    const authStore = useAuthStore()
    wrapper = await mountSuspended(LoginForm, {
      props: {
        authStore: authStore,
      },
      global: {
        provide: {
        },
        components: {
        },
        plugins: [vuetify],
      },
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  test('displays message', async () => {
    // Busca los inputs
    const form = wrapper.findComponent('[data-testid="form"]')
    const usernameInput = wrapper.findComponent('[data-testid="username"]')
    const passwordInput = wrapper.findComponent('[data-testid="password"]')
    const button = wrapper.findComponent('[data-testid="btnLogin"]')

    // Espera que este en la vista
    expect(usernameInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    expect(button).toBeDefined()

    // Cambia los valores de los inputs
    usernameInput.setValue('aaaaaa')
    passwordInput.setValue('123')

    // Revisa que las referencias hayan cambiado su valor
    expect(toValue(wrapper.vm.userName)).toBe('aaaaaa')
    expect(toValue(wrapper.vm.password)).toBe('123')

    // Generar un click en el boton
    await form.trigger('submit')
    expect(wrapper.vm.isLoading()).toBe(true)

    // Espera que cargue las promesas y actualice la vista (aunque no llame las apis)
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoading()).toBe(false)
  })
})
