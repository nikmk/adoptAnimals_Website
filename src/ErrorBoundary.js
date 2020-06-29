//mostly from the docs
import React, { Component } from "react";
import { Link, navigate } from "@reach/router";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      // redirect:false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    //eslint-disable-next-line
    console.log("ErrorBoundary Activated", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => navigate("/"), 5000);
    }
  }
  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/" />;
    // }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing <Link to="/">Click Here</Link> to
          go to homepage or wait five seconds
        </h1>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
