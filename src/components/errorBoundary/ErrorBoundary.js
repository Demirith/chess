import React from "react";
import ErrorDisplay from "./errorDisplay/ErrorDisplay";
export const ErrorContext = React.createContext();

class ErrorBoundary extends React.Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    report = (error) => this.setState({ error });
    render() {
        if (this.state.error) {
            return <ErrorDisplay error={this.state.error} />
        }

        return (
            <ErrorContext.Provider value={this.report}>
                { this.props.children }
            </ErrorContext.Provider>
            )
    }  
}

export default ErrorBoundary;