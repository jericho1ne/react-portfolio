import React, {Component} from 'react'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMsg: ''
  }

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMsg: error
    })
  }

  render() {
    if (this.state.hasError) {
      return <h5>{ this.state.errorMsg }</h5>
    }

    // If no errors, default to returning actual  component
    return this.props.children
  }
}

export default ErrorBoundary
