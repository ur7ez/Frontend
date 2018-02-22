import React, {Component} from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Toggle checkbox'};
    }


    handleClick = (e) => {
        this.setState({chk: false});
        console.log('btn: props checkboxValue: ' + this.props.checkboxValue);
        // this.setState({chk: chk});
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.value}</button>
            </div>
        );
    }
}