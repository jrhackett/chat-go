import { createStore } from 'redux'
import reducers from './reducers'
import throttle from 'lodash/throttle'

const configureStore = () => {
  return createStore(reducers)
}

export default configureStore
