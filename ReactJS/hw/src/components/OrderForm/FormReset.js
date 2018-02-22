import React from "react";

export default class FormReset extends React.Component {
    render() {
        return (
            <input type="reset" name={this.props.nameReset} id={this.props.id} value={this.props.value}/>
        );
    }
}