import React from "react";

function ErrorDisplay(props) {
    const errorMessage = props.error.error;
    return (
        <div>
            <label htmlFor="error">Something went wrong: </label>
            { errorMessage }
        </div>
    )
}

export default ErrorDisplay;