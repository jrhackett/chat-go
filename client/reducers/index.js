import { combineReducers } from 'redux'
import chat from './chat'
import user from './user'

const reducers = combineReducers({
    chat,
    user
})
  
export default reducers
