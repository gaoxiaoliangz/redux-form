import React, { Component } from 'react'
import { connect } from 'react-redux'
import form from 'better-redux-form'
import _ from 'lodash'

class AddAuthorForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showResult: false,
      value1: '',
      value2: ''
    }
  }

  handleSave(data) {
    this.setState({
      showResult: true,
      value1: data.value1,
      value2: data.value2
    })

    setTimeout(() => {
      this.setState({
        showResult: false
      })
    }, 300000)
  }

  render() {
    const {
      fields: { value1, value2 },
      handleSubmit
    } = this.props

    return (
      <div>
        <input placeholder="value1" {..._.pick(value1, ['value', 'onChange']) } />
        <input placeholder="value2" {..._.pick(value2, ['value', 'onChange']) } />
        <button onClick={handleSubmit(data => {
          this.handleSave(data)
        })}>Save</button>
        {
          this.state.showResult && (
            <div className="result">
              <h3>Data:</h3>
              <div>value1: {this.state.value1}</div>
              <div>value2: {this.state.value2}</div>
            </div>
          )
        }
      </div>
    )
  }
}

AddAuthorForm = form({
  form: 'basic',
  fields: ['value1', 'value2'],
  destroyOnUnmount: true
})(AddAuthorForm)

AddAuthorForm = connect(
  state => state
)(AddAuthorForm)

export default AddAuthorForm
