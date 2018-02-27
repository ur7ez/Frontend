import React from "react";

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
        let val = (props.value) ? props.value : '';
        this.state = {
            value: val,
            type: (props.type) ? props.type : "text",
            valueValid: this.validateValue(props.nameAttr, val),
            required: (props.required === 'true') ? props.required : null
        };
        this.onChange = this.onChange.bind(this);
    }

    validateValue(name, val) {
        let re;
        switch (name) {
            case 'FIO':
                return val.toString().trim().length > 2;
            case 'e-mail':
                re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(val);
            case 'phone':
                re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                return re.test(val);
            case 'date':
                re = /^(0?[1-9]|[12][0-9]|3[01])[./-](0?[1-9]|1[012])[./-]\d{4}$/;
                let re2 = /^\d{4}[./-](0?[1-9]|1[012])[./-](0?[1-9]|[12][0-9]|3[01])$/;
                return re.test(val) || re2.test(val);
            case 'quantity':
                return val > 0;
            default:
                return true;
        }
    }

    onChange = (e) => {
        let val = e.target.value;
        let valid = true;
        if (this.props.required === 'true') valid = this.validateValue(this.props.nameAttr, val);
        this.setState({value: val, valueValid: valid});
    };

    render() {
        let req = '', req2 = null;
        let inputValidityColor = 'initial';
        if (this.props.required === 'true') {
            inputValidityColor = (this.state.valueValid === true) ? "green" : "red";
            req = <span>*</span>;
            req2 = <span/>;
        }
        return (
            <p className={this.props.class}>
                <label>{this.props.labelCaption}:
                    {req}
                    <br/>
                    <input type={this.state.type} id={this.props.id} name={this.props.nameAttr}
                           placeholder={this.props.placeholder}
                           required={this.state.required} value={this.state.value} onChange={this.onChange}
                           style={{borderColor: inputValidityColor}}/>
                    {req2}
                </label>
            </p>
        );
    }
}