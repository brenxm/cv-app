import React from "react";

class DropdownInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { elemName, label, selection, id} = this.props;
        return (
            <div className="single-input" id={id}>
                <label className="label-input"htmlFor={elemName}>{label}</label>
                <select className="text-inputs">
                    {selection.map(
                        item => <option key={item}>{item}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default DropdownInput; 