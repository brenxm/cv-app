import PersonalInfo from "./components/personalinfo";
import SectionTitles from "./components/sectiontitles";
import Button from "./components/button";
import Education from "./components/education";
import React from "react";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      educations: [],
      workExperiences: []
    }

    this.addEducation = this.addEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
  }

  addEducation() {
    const count = this.state.educations.length + 1;
    this.setState({
      educations: [...this.state.educations, <Education title={"Education " + count} key={count} id={count}/>]
    })
  }

  deleteEducation() {
    // remove selected key number
    // Recount the number
  }

  render() {
    return (
      <div className="main-viewport" >
        <div className="form-main-container">
          <div>
            <SectionTitles title="Personal information" />
            <PersonalInfo />
          </div>
          <div>
            <SectionTitles title="Education" />
            {this.state.educations}
            <Button fn={this.addEducation} label="Add education" />
          </div>
          <div>
            <SectionTitles title="Work experience" />
            {/* array of forms here*/}
            <Button label="Add work experience" />
          </div>
        </div>
        <div className="cv-result-container">
        </div>
      </div>
    );
  }
}

export default App;
