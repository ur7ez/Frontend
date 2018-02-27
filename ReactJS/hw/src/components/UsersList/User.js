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

        if (this.props !== undefined && this.props.name !== undefined && this.props.name[this.state.id - 1] !== undefined) {
            let name = this.props.name[this.state.id - 1];
            this.setState({name: name.name});
        } else {
            let users_url = 'https://jsonplaceholder.typicode.com/users';
            fetch(users_url)
                .then(response => response.json())
                .then(json => this.setState({name: json[this.state.id - 1].name}));
        }
    }

    render() {
        return (
            <div>
                <h2>User {this.state.name}:</h2>
                <p><span>Title: </span>{this.state.user.title}</p>
                <p><span>Body: </span>{this.state.user.body}</p>
            </div>
        )
    }
}