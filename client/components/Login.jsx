import React from 'react'
import { connect } from 'react-redux'
import { authenticateUser } from '../actions/user'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: ''
        }
    }

    onInputChange(field, value) {
        this.setState({
            [field]: value
        })
    }

    onSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.onAuth()
    }
    
    render() {
        return(
            <div>
                <form onSubmit={() => false}>
                    <input onChange={ e => this.onInputChange('username', e.target.value) } />
                    <input onChange={ e => this.onInputChange('email', e.target.value) } />
                    <button onClick={ e => this.onSubmit(e) }>Login</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch => ({
    onAuth: () => {
        dispatch(authenticateUser())
    }
}))

export default connect(null, mapDispatchToProps)(Login)
