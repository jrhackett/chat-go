import React from 'react'
import { connect } from 'react-redux'
import { authenticateUser } from '../actions/user'

class Root extends React.Component {

    componentDidMount() {
        this.props.dispatch(authenticateUser())
    }

    render() {
        return (
            <div>
                <p>Logged in state: {this.props.loggedIn.toString()}</p>
                {this.props.loggedIn &&
                    <div>
                        <p>Name: {this.props.username}</p>
                        <p>Email: {this.props.email}</p>
                    </div>
                }
                <button onClick={() => this.props.dispatch(authenticateUser())}>Try to auth</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.user.name,
    email: state.user.user.email
})

export default connect(mapStateToProps)(Root)
