import React, { Component } from "react";

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    // Catches any error that is thrown in any of the children wrapped in this ErrorBoundary component
    static getDerivedStateFromError(error) {
        // Return the new local state when an error occurs
        return {
            hasError: true
        };
    }

    // Used to perform side effects with the error that was thrown or log the error
    componentDidCatch(error, info) {
        console.log(error, info);
    }


    render() {
        if(this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                    <ErrorImageText>ERROR: Sorry, a dog ate this page.</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        // If there are no errors, then return the wrapped components as normal.
        else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;