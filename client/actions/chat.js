export const addMessage = (message, author) => ({
    type: types.ADD_MESSAGE,
    message,
    author
})

export const addUser = name => ({
    type: types.ADD_NEW_USER,
    name
})

export const messageReceived = (message, author) => ({
    type: types.MESSAGE_RECEIVED,
    message,
    author
})

export const populateUsersList = users => ({
    type: types.REFRESH_USERS,
    users
})
