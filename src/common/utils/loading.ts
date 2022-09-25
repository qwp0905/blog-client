import { store } from '../../store'
import { completeLoading, startLoading } from '../../store/slices/loading.slice'

export const load = {
  start() {
    store.dispatch(startLoading())
  },
  end() {
    store.dispatch(completeLoading())
  }
}
