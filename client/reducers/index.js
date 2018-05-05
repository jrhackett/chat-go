import { combineReducers } from 'redux'
import chat from './chat'
import user from './user'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
    chat,
    user,
    routing: routerReducer
})
  
export default reducers
