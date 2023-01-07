import PersonalInfo from "./components/personalinfo";
import SectionTitles from "./components/sectiontitles";
import Button from "./components/button";
import Education from "./components/education";
import WorkEperience from "./components/workexperience";
import React from "react";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      educations: [],
      workExperiences: []
    }

    this.addEducation = this.addEducation.bind(this);
    this.removeEducation = this.removeEducation.bind(this);
    this.removeExperience = this.removeExperience.bind(this);
    this.addExperience = this.addExperience.bind(this);
  }

  addEducation() {
    const count = this.state.educations.length;
    this.setState({
      educations: [...this.state.educations, <Education title={"Education " + (count + 1)} key={count} id={count} removeBtn={this.removeEducation}/>]
    })
  }

  removeEducation(id, e) {
    e.preventDefault();

   this.setState({
    educations: this.state.educations.reduce((accu, curr) => {
      if (curr.key == id){
        return accu;
      } 
      return accu = [...accu, curr];
    }, [])
   })

   // Update the count for each education element that was added
  }

  addExperience() {
    const count = this.state.workExperiences.length;
    this.setState({
      workExperiences: [...this.state.workExperiences, <WorkEperience id={count} key={count} removeBtn={this.removeExperience} title={"Experience " + (count + 1)}/>]
    })
  }

  removeExperience(id, e) {
    e.preventDefault();
    this.setState({
      workExperiences: this.state.workExperiences.reduce((accu, curr)=>{
        if(curr.key == id){
          return accu;
        }

        return accu = [...accu, curr];
      },[])
    })

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
            {this.state.workExperiences}
            <Button fn={this.addExperience}label="Add work experience" />
          </div>
        </div>
        <div className="cv-result-container">
        </div>
      </div>
    );
  }
}

export default App;
