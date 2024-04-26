import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import ExampleTest from '~/components/ExampleTest.vue'

// Montar componentes para visualizar si se muestra bien los datos
describe('ExampleTest Component', () => {
  let wrapper: VueWrapper
  afterEach(() => {
    wrapper?.unmount()
  })

  // Primera prueba
  test('The value increases with each click', async () => {
    const wrapper = mount(ExampleTest)
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[data-testid="counter"]').text()).toBe('1')
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[data-testid="counter"]').text()).toBe('2')
  })

  // Segunda prueba
  test('The Nuxt version is displayed correctly', async () => {
    const wrapper = mount(ExampleTest)
    expect(wrapper.get('[data-testid="nuxt-version"]').text()).toBe('3.11.2')
  })

  // Tercera prueba con props
  test('The title is displayed correctly', async () => {
    const title_example = 'Texto de ejemplos'
    const wrapper = mount(ExampleTest, {
      props: {
        title: title_example,
      },
    })
    expect(wrapper.get('[data-testid="title"]').text()).toBe(title_example)
    expect(wrapper.get('[data-testid="title"]').text()).not.toEqual('distinto')
  })
})
