import * as actionTypes from '../actionTypes'

const initialState = {
    messages: []
}

const chat = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE:
        case actionTypes.MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }
}

export default chat
