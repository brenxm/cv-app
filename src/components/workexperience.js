import React from "react";
import SingleInput from "./singleinput";
import { DropdownInput, TextAreaInput } from "./dropdowninput";
import { DeleteButton } from "./button";
import SectionTitles from "./sectiontitles";
import { Button } from "./button";
import { generateUid } from "../helper";

// Container of all WorkExperiences
class Experiences extends React.Component {
    constructor(props) {
        super(props);

        this.formRef = {};

        this.state = {
            experiences: [],
        }

        this.addExperience = this.addExperience.bind(this);
        this.removeExperience = this.removeExperience.bind(this);
        this.createFormRef = this.createFormRef.bind(this);
        this.getInputTest = this.getInputTest.bind(this);

    }

    addExperience(e) {
        e.preventDefault();
        const experiences = this.state.experiences;
        const ids = experiences.map(ea => ea.id);
        const uid = generateUid(ids);

        this.createFormRef(uid);

        const newComponent = <WorkEperience key={uid} id={uid} removeBtn={this.removeExperience} ref={this.formRef[uid]} />

        this.setState({
            experiences: [...this.state.experiences, newComponent],
        })

    }

    removeExperience(id, e) {
        e.preventDefault();

        delete this.formRef[id];

        this.setState({
            experiences: this.state.experiences.reduce((accu, curr) => {
                if (curr.key == id) {
                    return accu;
                }

                return accu = [...accu, curr];
            }, [])
        })
    }

    createFormRef(uid) {
        const newForm = React.createRef();
        this.formRef[uid] = newForm;
    }

    getInputTest() {
        console.log(this.formRef.current);
    }

    render() {
        return (
            <div>
                <SectionTitles title="Work experience" />
                {this.state.experiences}
                <Button onClick={this.addExperience} label="Add work experience" />
            </div>
        );
    }
}

class WorkEperience extends React.Component {
    constructor(props) {
        super(props);

        this.inputs = {};

        this.state = {
            id: null,

            // Style //
            textAreaCount: "0/500",
            textAreaColor: "gray",
            specifyDisplay: "none",
            specifyRequired: false,

            endDateRequired: false,
            endDateDisplay: "none",
            // End Style //
        }

        this.positionOnChange = this.positionOnChange.bind(this);
        this.removeBtn = this.removeBtn.bind(this);
        this.dateCompletionOnChange = this.dateCompletionOnChange.bind(this);
        this.createInputRef = this.createInputRef.bind(this);
    }

    removeBtn(e) {
        this.props.removeBtn(this.state.id, e);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
        })
    }

    createInputRef(elem) {
        this.inputs[elem.props.elemName] = elem;
    }

    // Style //

    positionOnChange(e) {
       if (e.target.value == "Other"){
        this.inputs["workSpecPos"].setRequired(true);

        this.setState({
            specifyDisplay: "block"
        })
        return;
       } 

       this.inputs["workSpecPos"].setRequired(false);

        this.setState({
            specifyDisplay: "none"});
    }

    dateCompletionOnChange(e) {
        this.setState({
            endDateDisplay: e.target.value == "No" ? "Block" : "none",
            endDateRequired: e.target.value == "No" ? true : false
        })
    }
    // End Style //

    render() {
        return (
            <div className="work-form">
                <SingleInput id="one" placeHolder="Google/Microsoft" label="Employer *" elemName="workExpName" required createRef={this.createInputRef} format={/./} properFormat={"none"} />
                <SingleInput id="two" placeHolder="New York" label="City *" elemName="city" required createRef={this.createInputRef} format={/./} properFormat={"none"} />
                <DropdownInput id="four" elemName="workExpState" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} required createRef={this.createInputRef} />
                <div id="three">
                    <DropdownInput elemName="position" label="Position *" selection={['Accountant', 'Actor', 'Architect', 'Artist', 'Athlete', 'Baker', 'Banker', 'Barber', 'Beautician', 'Biomedical engineer', 'Carpenter', 'Chef', 'Civil engineer', 'Computer programmer', 'Construction worker', 'Counselor', 'Dancer', 'Dentist', 'Designer', 'Doctor', 'Electrician', 'Engineer', 'Firefighter', 'Florist', 'HVAC technician', 'Interior designer', 'Journalist', 'Lawyer', 'Musician', 'Nurse', 'Optometrist', 'Pharmacist', 'Photographer', 'Physical therapist', 'Plumber', 'Police officer', 'Psychologist', 'Real estate agent', 'Restaurant owner', 'Salesperson', 'Scientist', 'Social worker', 'Software developer', 'Teacher', 'Vet', 'Web developer', 'Other']} onChange={this.positionOnChange} createRef={this.createInputRef} />
                    <SingleInput label="Specify *" elemName="workSpecPos" style={{ display: this.state.specifyDisplay }} required={this.state.specifyRequired} createRef={this.createInputRef} format={/./} properFormat={"none"} />
                </div>
                <DropdownInput id="five" label="Current *" selection={["Yes", "No"]} onChange={this.dateCompletionOnChange} elemName="currentJob" createRef={this.createInputRef} />
                <SingleInput id="six" label="Start *" elemName="workStartDate" required createRef={this.createInputRef} format={/./} properFormat={"none"} type="date"/>
                <SingleInput id="seven" label="End *" elemName="workEndDate" style={{ display: this.state.endDateDisplay }} required={this.state.endDateRequired} createRef={this.createInputRef} format={/./} properFormat={"none"} type="date"/>
                <TextAreaInput className="exp-text-area"id={"eight"} required elemName="textArea" createRef={this.createInputRef} format={/./} />
                <DeleteButton onClick={this.removeBtn} />
            </div>
        );
    }
}

class RenderExperience extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { experiences, formDisplay } = this.props;
        return (
            <div className="form-experiences" style={{ display: formDisplay}}>
                <h3>Experiences</h3>
                {
                    experiences.map(
                        exp => {
                            const { workExpName, city, workExpState, position, workSpecPos, currentJob, workStartDate, workEndDate, textArea, id } = exp;
                            return (
                                <div key={id} style={{margin: "20px 30px"}}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "18px",
                                        fontWeight:"550",
                                        color: "rgb(30, 30, 30)", 
                                        width: "100%"
                                    }}>
                                        <span>{position == "Other" ? workSpecPos : position}</span>
                                        <span style={{fontWeight: "400", 
                                        fontStyle: "italic"
                                        }}>{currentJob == "Yes" ? `${workStartDate} - current` : `${workStartDate} - ${workEndDate}`}</span>
                                    </div>
                                    <div>
                                        <span style={{fontSize: "17px"}}>{workExpName}, {city} {workExpState}</span>
                                    </div>
                                    <div>
                                        <p style={{margin: "10px 0 25px 0", color: "rgb(90, 90, 90)"}}>{textArea}</p>
                                    </div>
                                </div>)
                        }
                    )
                }
            </div>
        )
    }
}

export { Experiences, RenderExperience };