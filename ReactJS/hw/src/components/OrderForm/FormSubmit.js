import React from "react";

export default class FormSubmit extends React.Component {
    render() {
        return (
            <input type="submit" name={this.props.nameSubmit} id={this.props.id} value={this.props.value}/>
        );
    }
}