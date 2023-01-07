import React from "react";
import SingleInput from "./singleinput";
import DropdownInput from "./dropdowninput";

class Education extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null
        };

        this.removeBtn = this.removeBtn.bind(this);
    }   

    /**
     * 
     * @param {int} from 
     * @returns [numbers]
     */
    generateYears(from) {
        // get current date
        const date = new Date();

        if (typeof (from) != "number" || from == null) {
            console.error("Please use valid input. INT lesser than the current year")
            return;
        }
        if (from > date.getFullYear()) {
            console.error("beginning year cannot be greater than current year");
            return;
        }

        const years = [];
        for (let i = date.getFullYear(); i >= from; i--) {
            years.push(i);
        }

        return years;
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
    }

    removeBtn(e) {
        this.props.removeBtn(this.state.id, e);
    }

    render() {
        return (
            <form className="education-form">
                <div className="edu-form-single-title">{this.props.title}</div>
                <SingleInput id="one"placeHolder="Saint Augutine's School" label="School name *" elemName="schoolName" />
                <SingleInput id="two"placeHolder="Houston" label="City *" elemName="schoolCity" />
                <DropdownInput id="three" label="State *" selection={['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']} elemName="schoolState" />
                <div id="four">
                    <DropdownInput label="Type *" selection={["Technical", "Graduate degree", "Bye"]} elemName="degreeType" />
                    <SingleInput placeHolder="Nursing" label="Major" elemName="major" />
                </div>
                <DropdownInput id="five"label="Completed *" selection={["Yes", "No", "Current"]} elemName="schoolCompletion" />
                <DropdownInput id="six"label="Month *" selection={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} elemName="monthCompletion" />
                <DropdownInput id="seven"label="Year *" selection={this.generateYears(1900)} elemName="yearCompletion" />
                <button onClick={this.removeBtn} className="edu-form-delete-btn">Delete?</button>
            </form>
        );
    }
}

export default Education;