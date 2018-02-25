import React from 'react';
import Item from './Item'

export class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentWillMount() {
        let users_url = 'https://jsonplaceholder.typicode.com/users';
        fetch(users_url)
            .then(response => response.json())
            .then(json => this.setState({users: json}));
    }

    render() {
        return (
            <div>
                <h2>Users:</h2>
                <ul>
                    {
                        this.state.users.map(function (user) {
                            return <Item key={user.id} item={user}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}