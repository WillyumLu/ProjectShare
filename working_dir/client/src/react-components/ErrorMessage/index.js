import React from "react";

import "./styles.css";

/* The Header Component */
class ErrorMessage extends React.Component {

    render() {
        return (
            <div className="error">
                <div className="errorMessage">
                    "User does not exist"
                </div>
            </div>
        );
    }
}

export default ErrorMessage;
