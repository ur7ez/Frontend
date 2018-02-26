import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom'

import Input from './components/input';
import {About, Product, Products} from './components/myRoute';
import {UsersList} from './components/UsersList/UsersList';
import User from './components/UsersList/User';
import OrderForm from './components/OrderForm/OrderForm';
import ToDo from './components/ToDoList/ToDo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {chk: true};
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Input val="my ReactJS CheckBox"/>
                <Router>
                    <nav>
                        <NavLink activeClassName="active" exact to="/"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>About</NavLink>
                        <NavLink activeClassName="active" to="/products"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Products</NavLink>
                        <NavLink activeClassName="active" to="/product"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Product 1</NavLink>
                        <NavLink activeClassName="active" to="/users"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Users</NavLink>
                        <Switch>
                            <Route exact path="/" component={About}/>
                            <Route path="/products" component={Products}/>
                            <Route path="/product" component={Product}/>
                            <Route exact path="/users" component={UsersList}/>
                            <Route path="/users/:id(\d+)" component={User}/>
                        </Switch>
                    </nav>
                </Router>
                <br/>
                <OrderForm id="form_1" formMethod="post" formAction="#" formName="form_submit"/>
                <ToDo/>
            </div>
        );
    }
}

export default App;