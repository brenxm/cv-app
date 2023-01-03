import SingleInput from "./singleinput";
import React from 'react';

class PersonalInfo extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <SingleInput placeHolder="testing only" label="First name" elemName="testName"/>
            </div>
        );
    }
}

export default PersonalInfo;