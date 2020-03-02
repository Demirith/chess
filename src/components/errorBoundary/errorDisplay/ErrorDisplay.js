import React from "react";

function ErrorDisplay(props) {
    return (
        <p>Something went wrong: { JSON.stringify(props.error) }</p>
    )
}

export default ErrorDisplay;