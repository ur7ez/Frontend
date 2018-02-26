import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Item from './Item'
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
                <Router>
                    <ul>
                        {
                            this.state.users.map(user => <Item key={user.id} item={user}/>)
                        }
                        <Switch>
                            <Route path={`${this.props.match.url}/:id`}
                                   render={(props) => <User name={this.state.users} {...props}/>}/>
                        </Switch>
                    </ul>
                </Router>
            </div>
        );
    }
}