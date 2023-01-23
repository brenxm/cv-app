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

class IconButton extends React.Component {
    constructor(props){
        super(props)
    }

    render (){
        const {onClick, icon, label} = this.props
        return (
            <button style={{
                backgroundColor: "#59C1B7",
                border: "none",
                padding: "10px 30px 10px 15px",
                display: "flex",
                gap: "10px",
                borderRadius: "10px",
                color: "white",
                fontSize: "17px"

            }} onClick={onClick}>
                <img src={icon} style={{
                    height: "20px"
                }}></img>
                {label}
            </button>
        )
    }
}

export {DeleteButton, Button, IconButton};