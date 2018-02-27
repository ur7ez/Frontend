import React from "react";
import FormSubmit from './FormSubmit'
import FormReset from './FormReset'

export default class FormFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={this.props.classSub}>
                <div className={this.props.classFooter}>
                    <FormSubmit nameSubmit="button1" id="submit" value="Отправить"/>
                    <FormReset nameReset="button2" id="reset" value="Очистить"/>
                </div>
            </div>
        );
    }
}