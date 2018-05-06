import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import Message from './Message';
import MessageInputBar from './MessageInputBar';

const chatTopBar = css`
    width: 100%;
    background-color: #446CB3;
    color: white;
    padding: 0.5rem 1rem;

    p {
        margin: 0;
    }
`

const Chat = ({ user, messages }) => (
    <div>
        <div className={ chatTopBar }>
            <p>Logged in as: { user.name }, { user.email }</p>
        </div>
        { messages.map(message => (
            <Message user={ user } message={ message } />
        )) }
        <MessageInputBar />
    </div>
)

const mapStateToProps = state => ({
    user: state.user.user,
    messages: [] // TODO get messages from state
})

export default connect(mapStateToProps)(Chat)
