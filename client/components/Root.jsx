import React from 'react'
import { Provider, connect } from 'react-redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { authenticateUser } from '../actions/user'
import Register from './user/Register'
import Chat from './chat/Chat'

class Root extends React.Component {
    componentDidMount() {
        this.props.onAuth()
    }

    render() {
        return (
            <Provider store={ this.props.store }>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route exact path="/register" render={() => (
                                this.props.loggedIn ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Register />
                                )
                            )} />
                            <Route exact path="/" render={() => (
                                this.props.loggedIn ? (
                                    <Chat />
                                ) : (
                                    <Redirect to="/register" />
                                )
                            )} />
                        </Switch>
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch => ({
    onAuth: () => {
        dispatch(authenticateUser())
    }
}))

export default connect(mapStateToProps, mapDispatchToProps)(Root)
