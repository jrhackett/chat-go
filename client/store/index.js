import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import throttle from 'lodash/throttle'

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
}

export default configureStore
