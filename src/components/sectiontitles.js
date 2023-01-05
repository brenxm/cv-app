import React from "react";

class SectionTitles extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {title} = this.props;
        return (
            <div className="section-titles">
                <hr></hr>
                <div>{title}</div>
            </div>
        );
    }
}

export default SectionTitles;