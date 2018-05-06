import React from 'react'

const Message = ({ user, message }) => (
    <div>
        <p><span>{ user }: </span>{ message }</p>
    </div>
)

export default Message
