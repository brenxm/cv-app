import React from "react";
import { validInput } from "../helper";

class DropdownInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validationText: "This field is required.",
            validationTextVisibility: "visibile"
        }
        this.selectInput = React.createRef();
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        const { elemName, required } = this.props;
        this.props.createRef(this);
        this.setState({
            elemName: elemName,
            required: required
        });
    }

    setValue(val) {
        let value = val;
        value = val[1] + val[2];
        for (let i = 0; i < this.props.selection.length; i++) {
            if (this.props.selection[i] == value) {
                value = i;
            }
        }

        this.selectInput.current.selectedIndex = value;
    }

    render() {
        const { elemName, label, selection, id, onChange, required } = this.props;
        return (
            <div className="single-input" id={id}>
                <label className="label-input" htmlFor={elemName}>{label}</label>
                <select className="text-inputs" onChange={onChange} required={required} ref={this.selectInput} style={{backgroundColor: "white"}}>
                    {selection.map(
                        item => <option value={item} key={item}>{item}</option>
                    )}
                </select>
                <p className="error-text" style={{ visibility: this.state.validationTextVisibility }}>{this.state.validationText}</p>
            </div>
        )
    }
}

class TextAreaInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaCount: '0/500',
            textAreaColor: "gray",
            elemName: "",
            required: false
        }
        this.textInput = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentDidMount() {
        this.setState({
            elemName: this.props.elemName,
            required: this.props.required,
            errorText: "null"
        });

        this.props.createRef(this);
    }

    onChange(e) {
        const textCount = e.target.value.length;
        this.setState({
            textAreaCount: textCount + "/500",
            textAreaColor: textCount >= 500 ? "red" : "gray",
            errorTextVisibility: "hidden"
        })
    }

    validateInput() {
        const required = this.state.required;
        const value = this.textInput.current.value;

        if (required && value === "") {
            this.setState({
                errorTextVisibility: "visible",
                errorText: "Required field. Please write something."
            })

            return false;
        }

        this.setState({
            errorTextVisibility: "hidden"
        })

        return value;
    }

    render() {
        const { id, required } = this.props;

        return (
            <div id={id} required={required} >
                <span style={{fontSize: "17px"}}>Job description *</span>
                <textarea onChange={this.onChange} ref={this.textInput} ></textarea >
                <div id="nine" style={{ color: this.state.textAreaColor }} >{this.state.textAreaCount}</div>
                <div className="error-text" style={{ visibility: this.state.errorTextVisibility, color: "red", position: "static" }}>{this.state.errorText}</div>
            </div>
        )
    }
}


class SuggestionBox extends React.Component {
    constructor(props) {
        super(props);

        this.selectItem = this.selectItem.bind(this);
        this.enableEventListeners = this.enableEventListeners.bind(this);
        this.disableEventListeners = this.disableEventListeners.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onDocumentPress = this.onDocumentPress.bind(this);
    }

    componentDidMount() {
        // Enable listeners that will disable this box when Esc, tab or click is executed
        this.enableEventListeners();
    }
    
    componentWillUnmount() {
        console.log("unmounted");
        this.disableEventListeners();
    }


    selectItem(e) {
        this.props.selectItem(e);
    }

    enableEventListeners() {
        document.addEventListener("click", this.onDocumentClick);
        document.addEventListener("keydown", this.onDocumentPress);
    }

    disableEventListeners() {
        document.removeEventListener("click", this.onDocumentClick);
        document.removeEventListener("keydown", this.onDocumentPress);
    }

    onDocumentClick() {
        this.props.disableBox();
    }

    onDocumentPress(e){
        if (e.key == "Escape" || e.key == "Tab"){
            this.props.disableBox();
        }
    }

    render() {
        const { visibility, selections } = this.props;
        return (
            <div className="autocomplete-dropdown-selection-cont" style={{ visibility: visibility }}>
                {
                    selections.map(
                        address => (
                            <div key={selections.indexOf(address)} onClick={this.selectItem}className="autocomplete-single-cont">
                                { address.description }
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}


export { DropdownInput, TextAreaInput, SuggestionBox }; 