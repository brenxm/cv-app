import React from 'react';

class SingleInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            errorText: "placeholder",
            errorTextVisibility: "hidden",
        }

        this.validateInput = this.validateInput.bind(this);
        this.renderInvalid = this.renderInvalid.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setRequired = this.setRequired.bind(this);

        this.inputText = React.createRef();
    }

    componentDidMount() {
        const { elemName, required, format, properFormat } = this.props;
        this.setState({
            elemName: elemName,
            required: required,
            formatAccepted: format,
            properFormat: properFormat
        })

        // Creating ref to it's parent for accessing state value
        this.props.createRef(this);
    }

    // on input change
    onChange(e) {
        this.setValue(e.target.value);
        // googlemap autocomplete API place search test
        try {
            this.props.autoComplete(e.target.value);
        } catch (err) {

        }

        this.setState({
            errorTextVisibility: "hidden"
        })
    }

    setValue(val) {
        this.inputText.current.value = val;
        this.setState({
            errorTextVisibility: "hidden"
        })
    }


    // The rules of validation is saved on it's own state
    // type of error has two types, 1: No input 2: invalid format
    // If value accepted, return the value in proper format
    // If value not accepted, render the error
    // If no input and not required, return 1
    validateInput() {
        const { required, formatAccepted } = this.state;
        const value = this.inputText.current.value;

        if (required && value == "") {
            this.renderInvalid(1);
            return false;
        }

        if (value == "") {
            return 1;
        }

        if (!formatAccepted.test(value)) {
            this.renderInvalid(2);
            return false;
        }

        this.setState({
            errorTextVisibility: "hidden",
            errorText: "placeholder"
        });

        // TODO: make sure to return this as formatted
        return value;
    }

    renderInvalid(errorType) {
        if (errorType == 1) {
            this.setState({
                errorText: "Required field. Please write something.",
                errorTextVisibility: "visible"
            })
            return;
        }

        this.setState({
            errorText: `Invalid format. Example of accepted formats are ${this.state.properFormat}.`,
            errorTextVisibility: "visible"
        })
    }

    // Make each word it's letter capital
    // Remove white spaces
    format(value) {

    }

    setFocus() {
        this.inputText.current.select();
    }

    setRequired(bool) {
        this.setState({
            required: bool ? true : false
        }) 
    }

    render() {
        const { placeHolder, label, id, style, defaultAutoComplete, type } = this.props;
        return (
            <div className='single-input' id={id} style={style} >
                <label className="label-input" >{label}</label>
                <input className="text-inputs" name={this.state.elemName} placeholder={placeHolder} onChange={this.onChange} autoComplete={defaultAutoComplete} ref={this.inputText} type={ type } style={{backgroundColor: "white"}}></input>
                <div className="error-text" style={{ visibility: this.state.errorTextVisibility }}>{this.state.errorText}</div>
            </div>
        );
    }
}

export default SingleInput;