import React from "react";
import SingleInput from "./singleinput";
import DropdownInput from "./dropdowninput";

class WorkEperience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            textAreaCount: "0/500", 
            textAreaColor: "gray"
        }

        this.textAreaOnChange = this.textAreaOnChange.bind(this);
        this.removeBtn = this.removeBtn.bind(this);
    }

    textAreaOnChange(e) {
        const textCount = e.target.value.length;
        this.setState({
            textAreaCount: textCount + "/500"
        })

        if (textCount >= 500){
            this.setState({
                textAreaColor: "red"
            })
        } else {
            this.setState({
                textAreaColor:"gray"
            })
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    removeBtn(e){
        this.props.removeBtn(this.state.id, e);
    }

    render() {
        return (
            <form className="work-form">
                <div className="edu-form-single-title">{this.props.title}</div>
                <SingleInput id="one" placeHolder="Lawyer" label="Work name *" elemName="workExpName" />
                <SingleInput id="two" placeHolder="" label="City *" elemName="" />
                <DropdownInput id="four" elemName="workExpState" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} />
                <div id="three">
                    <DropdownInput elemName="" label="Position *" selection={['Accountant', 'Actor', 'Architect', 'Artist', 'Athlete', 'Baker', 'Banker', 'Barber', 'Beautician', 'Biomedical engineer', 'Carpenter', 'Chef', 'Civil engineer', 'Computer programmer', 'Construction worker', 'Counselor', 'Dancer', 'Dentist', 'Designer', 'Doctor', 'Electrician', 'Engineer', 'Firefighter', 'Florist', 'HVAC technician', 'Interior designer', 'Journalist', 'Lawyer', 'Musician', 'Nurse', 'Optometrist', 'Pharmacist', 'Photographer', 'Physical therapist', 'Plumber', 'Police officer', 'Psychologist', 'Real estate agent', 'Restaurant owner', 'Salesperson', 'Scientist', 'Social worker', 'Software developer', 'Teacher', 'Vet', 'Web developer', 'Other']} />
                    <SingleInput label="Specify *" elemName="workSpecPos" />
                </div>
                <DropdownInput id="five" label="Current *" selection={["Yes", "No"]} elemName="" />
                <SingleInput id="six" label="Start *" elemName="workStartDate" />
                <SingleInput id="seven" label="End *" elemName="workEndDate" />
                <div id="eight">
                    <span>Job description *</span>
                    <textarea onChange={this.textAreaOnChange} className="text-area" maxLength={500}></textarea>
                    <div style={{color: this.state.textAreaColor}} id="nine">{this.state.textAreaCount}</div>
                </div>
                <button onClick={this.removeBtn} className="edu-form-delete-btn">Delete?</button>
            </form>
        );
    }
}

export default WorkEperience;