import React from "react";
import SingleInput from "./singleinput";
import { DropdownInput } from "./dropdowninput";
import { Button, DeleteButton } from "./button";
import SectionTitles from "./sectiontitles";
import { generateUid, generateYears } from "../helper";

class Education extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            educations: []
        }

        this.formRef = {};

        this.addEducation = this.addEducation.bind(this);
        this.removeEducation = this.removeEducation.bind(this);
        this.createFormRef = this.createFormRef.bind(this);
    }

    addEducation(e) {
        e.preventDefault();
        const ids = this.state.educations.map(elem => elem.key);
        const uid = generateUid(ids)

        this.createFormRef(uid);

        this.setState({
            educations: [...this.state.educations, <EducationForm key={uid} id={uid} removeBtn={this.removeEducation} ref={this.formRef[uid]} />],
        })
    }

    removeEducation(id, e) {
        e.preventDefault();

        delete this.formRef[id];

        this.setState({
            educations: this.state.educations.reduce((accu, curr) => {
                if (curr.key == id) {
                    return accu;
                }

                return accu = [...accu, curr];
            }, [])
        })
    }

    validateEachForm() {
        // For each form get all the datas
        // Check if each form is valid

        // Return as obj at with it's values and additional property with key of "accepted" and true or false if over all the data form is valid
        for (const key in this.formRef) {
            this.formRef[key].current.validateInputs();
        }
    }

    createFormRef(uid) {
        const newForm = React.createRef();
        this.formRef[uid] = newForm;
    }

    render() {
        return (
            <div>
                <SectionTitles title="Education" />
                {this.state.educations}
                <Button onClick={this.addEducation} label="Add education" />
            </div>
        );
    }
}



class EducationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            majorStyleDisplay: "block",
            majorRequired: true
        };

        this.inputs = {};

        this.removeBtn = this.removeBtn.bind(this);
        this.typeOnChange = this.typeOnChange.bind(this);
        this.createRefOfChild = this.createRefOfChild.bind(this);
    }

    typeOnChange(e) {
        this.setState({
            majorStyleDisplay: e.target.value == "High school diploma" || e.target.value == "GED" ? "none" : "block",
            majorRequired: e.target.value == "High school diploma" || e.target.value == "GED" ? false : true
        })
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    removeBtn(e) {
        this.props.removeBtn(this.state.id, e);
    }

    createRefOfChild(elem) {
        this.inputs[elem.props.elemName] = elem;
    }

    render() {
        return (
            <div className="education-form">
                <SingleInput id="one" placeHolder="Saint Augutine's School" label="School name *" elemName="schoolName" required createRef={this.createRefOfChild} format={/./} />
                <SingleInput id="two" placeHolder="Houston" label="City *" elemName="schoolCity" required createRef={this.createRefOfChild} format={/^[\s]*[\D]+[\s\D]*$/i} properFormat={"New York, Austin, Los Angeles"} />
                <DropdownInput id="three" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} elemName="schoolState" createRef={this.createRefOfChild} />
                <div id="four">
                    <DropdownInput label="Type *" selection={['Doctorate degree', 'Master\'s degree', 'Bachelor\'s degree', 'Associate degree', 'Vocational degree', 'GED', 'High school diploma']} elemName="degreeType" onChange={this.typeOnChange} createRef={this.createRefOfChild} />
                    <SingleInput placeHolder="Nursing" label="Major" elemName="major" style={{ display: this.state.majorStyleDisplay }} required={this.state.majorRequired} createRef={this.createRefOfChild} format={/./} />
                </div>
                <DropdownInput id="five" label="Completed *" selection={["Yes", "No", "Current"]} elemName="schoolCompletion" createRef={this.createRefOfChild} />
                <DropdownInput id="six" label="Month *" selection={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} elemName="monthCompletion" required createRef={this.createRefOfChild} />
                <DropdownInput id="seven" label="Year *" selection={generateYears(1900)} elemName="yearCompletion" createRef={this.createRefOfChild} />
                <DeleteButton onClick={this.removeBtn} />
            </div>
        );
    }
}

class RenderEducation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { educations, formDisplay } = this.props
        return (
            <div className="form-educations" style={{ display: formDisplay }}>
                <h3>Educations</h3>
                {educations.map(
                    edu => {
                        const { schoolName, schoolCity, schoolState, degreeType, major, monthCompletion, yearCompletion, schoolCompletion, id } = edu;
                        return (
                            <div key={id} className="education-single-form" style={{marginBottom: "10px"}}>
                                <div style={{fontSize: "18px", fontWeight: "550", color: "rgb(40, 40, 40)"}}>
                                    <span>{schoolName},</span>
                                    <span> {schoolCity}</span>
                                    <span> {schoolState}</span>
                                </div>
                                <div style={{fontSize: "17px"}}>
                                    {degreeType} {/(?:High school diploma|GED)/.test(degreeType) ? "" : `in ${major}`}
                                </div>
                                {
                                    schoolCompletion == "Current" ?
                                        <div>
                                            <span>Current, projected completion on 
                                                <span>{monthCompletion} {yearCompletion}</span>
                                            </span>
                                        </div> :
                                        schoolCompletion == "Yes" ?
                                            <div>
                                                <span>Graduated on <span>{monthCompletion} {yearCompletion}</span></span>
                                            </div> :

                                            <div>
                                                <span>
                                                    Not completed, last attended on <span>{monthCompletion} {yearCompletion}</span>
                                                </span>
                                            </div>
                                }
                            </div>
                        );
                    }
                )}

            </div>
        )
    }
}

export { Education, EducationForm, RenderEducation };