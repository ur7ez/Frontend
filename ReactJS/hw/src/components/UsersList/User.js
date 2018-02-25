import React from "react";

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: []};
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let user_url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(user_url)
            .then(response => response.json())
            .then(json => this.setState({user: json}));
    }

    render() {
        let name = this.props.children;
        return (
            <div>
                <h2>User {name}:</h2>
                <p><span>Title: </span>{this.state.user.title}</p>
                <p><span>Body: </span>{this.state.user.body}</p>
            </div>
        )
    }
}