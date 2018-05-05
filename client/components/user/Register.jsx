import React from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/user'

class Register extends React.Component {
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
        this.props.onRegister({
            name: this.state.username,
            email: this.state.email
        })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={() => false}>
                    <input onChange={ e => this.onInputChange('username', e.target.value) } />
                    <input onChange={ e => this.onInputChange('email', e.target.value) } />
                    <button onClick={ e => this.onSubmit(e) }>Register</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch => ({
    onRegister: (user) => {
        dispatch(registerUser(user))
    }
}))

export default connect(null, mapDispatchToProps)(Register)
