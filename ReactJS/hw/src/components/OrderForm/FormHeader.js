import React from "react";

export default class FormHeader extends React.Component {
    render() {
        return (
            <h2 className={this.props.class}>{this.props.formHeader}</h2>
        );
    }
}