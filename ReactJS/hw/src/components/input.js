import React, {Component} from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Toggle checkbox', chk: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange =(e) => {
        this.setState({chk: e.target.checked});
    };
    handleClick = (e) => {
        console.log('chk: '+!this.state.chk);
        this.setState({chk: !this.state.chk});
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.value}</button>
                <br/>
                <label htmlFor="inp1">
                    <input id="inp1" type="checkbox" value={this.props.val} checked={this.state.chk} onChange={this.handleChange}/>
                    {this.props.val}</label>
            </div>
        );
    }
}