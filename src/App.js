import PersonalInfo from "./components/personalinfo";
import SectionTitles from "./components/sectiontitles";
import { Education } from "./components/education";
import React from "react";
import { Experiences } from "./components/workexperience"
import { validateInputs, validateEachForm } from "./helper";
import Form from "./components/formsheet";
import { Button, IconButton } from "./components/button";
import mainLogo from "./assets/main_logo.png"
import print_icon from "./assets/print_icon.png"
import save_icon from "./assets/save_icon_1.png"
import edit_icon from "./assets/edit_icon.png"

class App extends React.Component {
  constructor(props) {
    super(props);
    // References
    this.personalInfo = React.createRef();
    this.education = React.createRef();
    this.experiences = React.createRef();
    this.displayForm = React.createRef();

    this.getDataInputs = this.getDataInputs.bind(this);
    this.toggleNavButtons = this.toggleNavButtons.bind(this);
    this.editOnClick = this.editOnClick.bind(this);
    this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
    this.printOnClick = this.printOnClick.bind(this);
    this.saveOnClick = this.saveOnClick.bind(this);

    this.state = {
      inputsDisplay: "block",
      formDisplay: "none",
      navGenerate: "flex",
      navResult: "none"
    }
  }

  // Return as values if all data as valid, else return false
  getDataInputs(e) {
    const { personalInfo, education, experiences } = this;
    const photo = personalInfo.current.state.uploadedPhoto;
    const personalInfoData = validateInputs(personalInfo.current.inputs);
    const eduFormData = validateEachForm(education.current.formRef);
    const xpFormData = validateEachForm(experiences.current.formRef)

    const dataInputs = [personalInfoData, eduFormData, xpFormData];

    const allInputValid = dataInputs.every(dataResult => dataResult.accepted);

    if (!allInputValid) {
      return null;
    }

    const data = {
      uploadedPhoto: photo,
      personalInfo: personalInfoData,
      educations: eduFormData.values,
      experiences: xpFormData.values
    };

    e.preventDefault();

    this.displayForm.current.onClick(data);
    this.toggleNavButtons();
    this.toggleFormDisplay();

    this.setState({
      inputsDisplay: "none"
    })
  }

  toggleFormDisplay() {
    this.setState({
      inputsDisplay: this.state.inputsDisplay == "block" ? "none" : "block",
      formDisplay: this.state.formDisplay == "none" ? "block" : "none"
    });
  }

  toggleNavButtons() {
    this.setState({
      navGenerate: this.state.navGenerate == "flex" ? "none" : "flex",
      navResult: this.state.navResult == "none" ? "flex" : "none",
    })
  }

  editOnClick() {
    this.setState({
      inputsDisplay: "block",
      formDisplay: "none",
      navGenerate: "flex",
      navResult: "none"
    })
  }

  printOnClick() {
    window.print();
  }

  saveOnClick() {
    // To be implemented
  }

  render() {
    return (
      <div className="main-viewport" >
        <div className="form-main-container" style={{ display: this.state.inputsDisplay }}>
          <div>
            <SectionTitles title="Personal information" />
            <PersonalInfo ref={this.personalInfo} />
          </div>
          <Education ref={this.education} />
          <Experiences ref={this.experiences} />
        </div>
        <Form ref={this.displayForm} styleDisplay={this.state.formDisplay} />
        <div className="nav-bar-btm">
          <div id="nav-generate-cont" style={{display: this.state.navGenerate}}>
            <img src={mainLogo} style={{ backgroundColor: "white" }}></img>
            <Button label="Generate CV" onClick={this.getDataInputs} />
          </div>

          <div id="nav-result-cont" style={{display: this.state.navResult}}>
            <IconButton icon = {edit_icon}label="Edit" onClick={this.editOnClick}/>
            <IconButton icon={save_icon} label="Save" onClick={this.saveOnClick}/>
            <IconButton icon={print_icon} label="Print" onClick={this.printOnClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
