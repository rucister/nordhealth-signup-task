import { setupWorker } from 'msw/browser'
import { handlers } from '~/mocks/handlers'

export default defineNuxtPlugin(() => {
  const worker = setupWorker(...handlers)
  worker.start({
    onUnhandledRequest: 'bypass'
  })
})