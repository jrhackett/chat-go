import * as actionTypes from '../actionTypes'

const initialState = {
    user: {
        name: '',
        email: ''
    },
    loggedIn: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUCCESSFUL_USER_AUTH:
            return {
                ...state,
                user: {
                    name: action.user.name,
                    email: action.user.email
                },
                loggedIn: true
            }
        case actionTypes.FAILED_USER_AUTH:
            return {
                ...state,
                user: null,
                loggedIn: false
            }
        default:
            return state
    }
}

export default user
