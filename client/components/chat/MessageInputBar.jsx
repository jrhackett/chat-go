import React from 'react'
import { connect } from 'react-redux'

class MessageInputBar extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
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
        this.props.onSubmit(this.state.message)
    }

    render() {
        return (
            <div>
                <form onSubmit={ () => false }>
                    <input onChange={ e => this.onInputChange("message", e.target.value) } />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: (message) => {
        // TODO dispatch new message that emits a ws message
    }
})

export default connect(null, mapDispatchToProps)(MessageInputBar)
