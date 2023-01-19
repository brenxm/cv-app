import PersonalInfo from "./components/personalinfo";
import SectionTitles from "./components/sectiontitles";
import { Education } from "./components/education";
import React from "react";
import { Experiences } from "./components/workexperience"
import { validateInputs, validateEachForm } from "./helper";
import Form from "./components/formsheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    // References
    this.personalInfo = React.createRef();
    this.education = React.createRef();
    this.experiences = React.createRef();

    this.getDataInputs = this.getDataInputs.bind(this);
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
    return data;
  }

  render() {
    return (
      <div className="main-viewport" >
        <div className="form-main-container">
          <div>
            <SectionTitles title="Personal information" />
            <PersonalInfo ref={this.personalInfo} />
          </div>
          <Education ref={this.education} />
          <Experiences ref={this.experiences} />
        </div>
        <Form dataInput={this.getDataInputs} />
      </div>
    );
  }
}

export default App;
