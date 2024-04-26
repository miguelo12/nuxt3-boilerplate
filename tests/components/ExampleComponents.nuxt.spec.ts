import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import AlertDefault from '~/components/alert/AlertDefault.vue'

it('can mount some component', async () => {
  const component = await mountSuspended(AlertDefault)
  expect(component.text()).toMatchInlineSnapshot(
    `"This is an auto-imported component"`,
  )
})
