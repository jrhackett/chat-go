import React from 'react'
import { Provider, connect } from 'react-redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { authenticateUser } from '../actions/user'
import Login from './Login'
import Chat from './Chat'

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
                            <Route path="/login" component={Login} />
                            <Route exact path="/" render={() => (
                                this.props.loggedIn ? (
                                    <Redirect to="/login" />
                                ) : (
                                    <Chat />
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
