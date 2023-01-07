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
                        <DropdownInput elemName="state" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} />
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