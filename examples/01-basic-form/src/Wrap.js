import React, { Component } from 'react'

class Wrap extends Component {

  render() {
    return (
      <div className="wrap">
        {
          this.props.children
        }
      </div>
    )
  }
}

export default Wrap
