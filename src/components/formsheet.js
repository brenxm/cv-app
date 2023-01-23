import React from "react";
import mainLogo from "../assets/main_logo.png"
import photoBadge from "../assets/photoclip.png";
import { Button } from "../components/button";
import { RenderEducation } from "./education";
import { RenderExperience } from "./workexperience";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            logoDisplay: "block",
            formDisplay: "none",
            formData: { personalInfo: "", educations: [], experiences: [] },
            generateCvText: "Generate CV",
            styleDisplay: "none",
            imageStyleDisplay: "none"
        }

        this.disableLogo = this.disableLogo.bind(this);
        this.displayForm = this.displayForm.bind(this);
    }

    onClick(data) {

        if (!data) return;

        this.disableLogo();
        this.dataToForm(data);
        this.displayForm();

        this.setState({
            generateCvText: "Regenerate CV",
            styleDisplay: "block",
            imageStyleDisplay: !data.uploadedPhoto ? "none" : "block"
        })
    }

    dataToForm(data) {
        this.setState({
            formData: data
        })
    }

    disableLogo() {
        this.setState({
            logoDisplay: "none"
        })
    }

    displayForm() {
        this.setState({
            formDisplay: "block"
        })
    }

    render() {
        const { formDisplay, logoDisplay, formData } = this.state;
        const { personalInfo, educations, experiences, uploadedPhoto } = formData;
        const { firstName, lastName, addressOne, zipcode, city, state, email, telNumber } = personalInfo;

        return (
            <div className="cv-result-container" style={{display:this.props.styleDisplay}}>
                <div className="form-sheet">
                    <div className="form-header" style={{ display: formDisplay }}>
                        <h1>{firstName} {lastName}</h1>
                        <div>{addressOne}, {city} {state} {zipcode}</div>
                        <div>{telNumber} | {email}</div>
                        <hr></hr>
                    </div>

                    <RenderEducation educations={educations} styleDisplay={formDisplay} />

                    <RenderExperience experiences={experiences} styleDisplay={formDisplay} />

                </div>
                <div className="photo-badge" style={{display: this.state.imageStyleDisplay}}>
                    <img alt="" src={uploadedPhoto}>

                    </img>
                </div>
                <img className="photo-clip" src={photoBadge} alt="" style={{display: this.state.imageStyleDisplay}}></img>
            </div>
        )
    }
}

export default Form;