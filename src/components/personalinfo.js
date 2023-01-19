import SingleInput from "./singleinput";
import React from 'react';
import { DropdownInput, SuggestionBox } from "./dropdowninput";
import { DeleteButton, Button } from "./button";
import { autoCompleteData } from "../helper.js"

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedPhoto: null,
            deletePhotoStyle: "none",
            inputElements: [],
            autoCompleteSelection: [],
            dropDownVisibility: "hidden",
            selectionBox: null
        }

        // Ref container of it's child
        this.inputs = {};
        this.imgRef = React.createRef();

        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.uploadPhotoOnChange = this.uploadPhotoOnChange.bind(this);
        this.createRefOfChild = this.createRefOfChild.bind(this);
        this.autoCompleteAddress = this.autoCompleteAddress.bind(this);
        this.autoaddressOnClick = this.autoaddressOnClick.bind(this);
        this.state.clearAutoComplete = this.clearAutoComplete.bind(this);
    }

    uploadPhotoOnChange(e) {
        const photo = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({
                uploadedPhoto: reader.result
            })
        }

        reader.readAsDataURL(photo);

        this.setState({
            deletePhotoStyle: e.target.value != null ? "block" : "none",
        })
    }

    uploadPhoto(e) {
        e.preventDefault();
        const uploadInput = document.querySelector(".upload-input");

        uploadInput.click();
    }

    // Removes uploaded photo if theres any
    removePhoto(e) {
        e.preventDefault();
        const uploadInput = document.querySelector(".upload-input");

        if (uploadInput.files[0] != undefined) {
            uploadInput.value = "";

            this.input = React.createRef();
            this.setState({
                deletePhotoStyle: "none"
            })
        }
    }

    createRefOfChild(elem) {
        this.inputs[elem.props.elemName] = elem;
    }

    // Validate each inputs current value, returns an object with key as their element name and value for their value, if value is valid, it returns the value, if invalid, it returns false.

    async autoCompleteAddress(input) {
       
        let data = await autoCompleteData(input);

        this.setState({
            selectionBox: <SuggestionBox selections={data.predictions} selectItem={this.autoaddressOnClick} disableBox={this.clearAutoComplete.bind(this)} />
        })
    }

    autoaddressOnClick(e) {
        const { zipcode, addressOne, state, city } = this.inputs;
        const [street, cityInput, stateInput] = e.target.innerText.split(",");

        addressOne.setValue(street);
        city.setValue(cityInput);
        state.setValue(stateInput);
        zipcode.setFocus();

        this.setState({
            selectionBox: null
        })
    }

    clearAutoComplete() {
        this.setState({
            selectionBox: null
        });
    }

    render() {
        return (
            <form className="personalinfo-form" >
                <div className="personalinfo-nameinput-cont">
                    <SingleInput placeHolder="John" label="First name *" elemName="firstName" required format={/^\D[\D\s]+\D$/i} createRef={this.createRefOfChild} properFormat={"Johnny, Sara, Mary Jane"} />
                    <SingleInput placeHolder="Doe" label="Last name *" elemName="lastName" createRef={this.createRefOfChild} required format={/^\D[\D\s]+\D$/i} properFormat={"Parker, bravo, poTtEr"} />
                </div>
                <div className="personalinfo-addressinput-cont">
                    <SingleInput placeHolder="1234 Nicehome street" label="Address 1 *" elemName="addressOne" required createRef={this.createRefOfChild} format={/^[\s]*\d{1,10}\s[\D]+[\s\D]*$/i} properFormat={"1234 Back Street Bys"} defaultAutoComplete="off" autoComplete={this.autoCompleteAddress} />

                    {this.state.selectionBox}

                    <SingleInput placeHolder="" label="Address 2" elemName="addressTwo" createRef={this.createRefOfChild} format={/./} />
                </div>
                <div className="personalinfo-addressone-cont">
                    <div>
                        <SingleInput placeHolder="Houston" elemName="city" label="City *" createRef={this.createRefOfChild} required format={/^[\s]*[\D]+[\s\D]*$/i} properFormat={"New York, Austin, Los Angeles"} />
                        <SingleInput placeHolder="77085" elemName="zipcode" label="Zip code *" createRef={this.createRefOfChild} required format={/^[\s]*[\d]{3,10}[\s]*$/} properFormat={"123, 12345, 1234578"} />
                        <SingleInput placeHolder="youremail@leafcv.com" elemName="email" label="Email *" createRef={this.createRefOfChild} format={/^[\s]*[\w]+\@[\D]+\.[\D]+[\s]*$/} properFormat={"leafCV@youremail.com"} required />
                        <SingleInput placeHolder="(777) 777-7777 " elemName="telNumber" label="Number *" createRef={this.createRefOfChild} format={/^\s*(?:\(\s?\d{3}\s?\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}\s*$/} required properFormat={"(777) 777 7777, 777 777 7777, 777-777-7777"} />
                    </div>
                    <div className="zipcode-cont">
                        <DropdownInput elemName="state" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} required createRef={this.createRefOfChild} />
                    </div>
                </div>
                <div className="upload-btn-cont">
                    <button className="addphoto-btn" onClick={this.uploadPhoto} htmlFor="NA">Upload photo</button>
                    <input className="upload-input" type="file" accept="image/*" name="files" htmlFor="imageInput" onChange={this.uploadPhotoOnChange} />
                    <DeleteButton onClick={this.removePhoto} style={{ display: this.state.deletePhotoStyle }} htmlFor="NA" />
                </div>
            </form>
        );
    }
}

export default PersonalInfo;