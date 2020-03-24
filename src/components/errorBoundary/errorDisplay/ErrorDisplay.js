import React from "react";

function ErrorDisplay(props) {
    return (
        <div>
            <span htmlFor="error">Something went wrong: { JSON.stringify(props.error) } </span>
        </div>
    )
}

export default ErrorDisplay;