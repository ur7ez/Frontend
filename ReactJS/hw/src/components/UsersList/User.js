import React from "react";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.match.params.id, name: '', user: []};
    }

    componentWillMount() {
        let user_url = `https://jsonplaceholder.typicode.com/posts/${this.state.id}`;
        fetch(user_url)
            .then(response => response.json())
            .then(json => this.setState({user: json}));

        if (this.props !== undefined && this.props.name[this.state.id - 1] !== undefined) {
            let name = this.props.name[this.state.id - 1];
            console.log('name: ', name);
            this.setState({name: name.name});
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h2>User {this.state.name}:</h2>
                <p><span>Title: </span>{this.state.user.title}</p>
                <p><span>Body: </span>{this.state.user.body}</p>
            </div>
        )
    }
}