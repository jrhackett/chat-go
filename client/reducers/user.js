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
                user: action.user,
                loggedIn: true
            }
        case actionTypes.FAILED_USER_AUTH:
            return {
                ...state,
                user: null,
                loggedIn: false
            }
        case actionTypes.ADD_NEW_USER:
            return state
        case actionTypes.REFRESH_USERS:
            return state
        default:
            return state
    }
}

export default user
