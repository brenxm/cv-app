import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, fn } = this.props;
        return (
           <button onClick={fn} className="addphoto-btn">{label}</button>
        );
    }
}

export default Button;