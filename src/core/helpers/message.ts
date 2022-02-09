import { Notyf } from 'notyf'

/**
 * Notify configurations.
 * https://github.com/caroso1222/notyf#api
 *
 */
const notify = new Notyf({
  // https://github.com/caroso1222/notyf#inotyfposition
  position: {
    x: 'center',
    y: 'top'
  },
  // Adds the 'close' button to the toast
  dismissible: true
  // More configurations
  // https://github.com/caroso1222/notyf#examples
})

type toastType = 'success' | 'error'

/**
 * Shows a toast message in the screen
 *
 * @param type - Defines the toast type
 * @param message - Defines the message will be shown
 */
export function showToastMessage(type: toastType, message: string) {
  notify.open({
    type: type,
    message: message
  })

  /**
   * TODO: add events
   * https://github.com/caroso1222/notyf#events
   */
}
