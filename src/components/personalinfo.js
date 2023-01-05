import SingleInput from "./singleinput";
import React from 'react';
import DropdownInput from "./dropdowninput";
import Button from "./button";

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <form className="personalinfo-form">
                <div className="personalinfo-nameinput-cont">
                    <SingleInput placeHolder="John" label="First name *" elemName="firstName" />
                    <SingleInput placeHolder="Doe" label="Last name *" elemName="lastName" />
                </div>
                <div className="personalinfo-addressinpu-cont">
                    <SingleInput placeHolder="1234 Nicehome street" label="Address 1 *" elemName="addressOne" />
                    <SingleInput placeHolder="" label="Address 2" elemName="addressTwo" />
                </div>
                <div className="personalinfo-addressone-cont">
                    <div>
                        <SingleInput placeHolder="Houston" elemName="city" label="City *" />
                        <SingleInput placeHolder="77085" elemName="zipcode" label="Zip code *" />
                        <SingleInput placeHolder="youremail@leafcv.com" elemName="email" label="Email *" />
                        <SingleInput placeHolder="(777) 777-7777 " elemName="telNumber" label="Number *" />
                    </div>
                    <div className="zipcode-cont">
                        <DropdownInput elemName="state" label="State *" selection={["tx", "cd", "am", "dc"]} />
                    </div>
                </div>
                <div className="upload-btn-cont">
                    <Button label="Upload photo" />
                    {/* placeholder */}
                    <span>yourphoto.jpg</span>
                </div>
            </form>
        );
    }
}

export default PersonalInfo;