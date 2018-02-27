import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import User from './User'

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
                        this.state.users.map(user =>
                            <Router key={user.id}>
                                <li><Link to={`${this.props.match.url}/${user.id}`}>{user.name}</Link>
                                    <Switch>
                                        <Route path={`${this.props.match.url}/:id`}
                                               render={(props) => <User name={this.state.users} {...props}/>}/>
                                    </Switch>
                                </li>
                            </Router>
                        )
                    }

                </ul>
            </div>
        );
    }
}