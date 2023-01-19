import React from "react";

class Button extends React.Component {

    render() {
        const { label, onClick } = this.props;
        return (
           <button onClick={onClick} className="addphoto-btn">{label}</button>
        );
    }
}

class DeleteButton extends React.Component{

    render() {
        const {onClick, style} = this.props;
        return (
            <button className="edu-form-delete-btn" onClick = {onClick} style={style}>Delete?</button>
        );
    }
}

export {DeleteButton, Button};