import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('can also mount an app', async () => {
  const component = await mountSuspended(App, { route: '/test' })
  expect(component.html()).toMatchInlineSnapshot(`
    "<div class="v-application v-theme--myTheme v-layout v-layout--full-height v-locale--is-ltr">
      <div class="v-application__wrap">
        <div class="v-layout" style="z-index: 900; position: relative; overflow: hidden;">
          <main class="v-main" style="--v-layout-left: 0px; --v-layout-right: 0px; --v-layout-top: 0px; --v-layout-bottom: 0px; transition: none !important;">
            <main p="x4 y10" text="center teal-700 dark:gray-200">
              <div text-4xl="">
                <div i-carbon-warning="" inline-block=""></div>
              </div>
              <div>Not found</div>
              <div><button text-sm="" btn="" m="3 t8"> Back </button></div>
            </main>
          </main>
        </div>
      </div>
    </div>"
  `)
})
