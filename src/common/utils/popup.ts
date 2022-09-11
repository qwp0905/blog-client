import { store } from '../../store'
import { openPopup } from '../../store/slices/popup.slice'

export const toast = {
  success(message = 'success') {
    store.dispatch(openPopup({ message, type: 'success' }))
  },
  error(message = 'error') {
    store.dispatch(openPopup({ message, type: 'error' }))
  },
  info(message = '') {
    store.dispatch(openPopup({ message, type: 'info' }))
  },
  warning(message = 'warning') {
    store.dispatch(openPopup({ message, type: 'warning' }))
  }
}
