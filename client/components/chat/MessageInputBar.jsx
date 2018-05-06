import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'

const messageBarSizing = css`
    padding: 0.5rem 0.5rem;
    font-size: 1rem;
`

const container = css`
    position: fixed;
    bottom: 0;
    width: 100%;

    &> form {
        width: 100%;
        display: flex;
        margin: 0;
    }
`

const messageInput = css`
    ${ messageBarSizing }

    flex-basis: 95%;
    border: 0;
    border-top: 1px solid #cecece;

    &:focus {
        outline: none;
    }
`

const messageButton = css`
    ${ messageBarSizing }

    flex-basis: 5%;
    border: 0;
    border-left: 1px solid #cecece;
    border-top: 1px solid #cecece;
`

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
            <div className={ container }>
                <form onSubmit={ () => false }>
                    <input className={ messageInput } onChange={ e => this.onInputChange("message", e.target.value) } />
                    <button className={ messageButton }>Send</button>
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
