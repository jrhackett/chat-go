import React from 'react'
import { connect } from 'react-redux'

const Chat = ({ user }) => (
    <div>
        <p>Logged in as: { user.name }, { user.email }</p>
    </div>
)

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps)(Chat)
