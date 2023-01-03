import React from 'react';

class SingleInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {placeHolder, label, elemName} = this.props;
        return (
            <div className='single-input'>
                <label className="label-input" htmlFor={elemName}>{label}</label>
                <input className="text-inputs" name={elemName} placeholder={placeHolder}></input>
            </div>
        );
    }
}

export default SingleInput;