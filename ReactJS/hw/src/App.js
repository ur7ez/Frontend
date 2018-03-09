import logo from './logo.svg';
import './App.css';
import './components/ToDoList/ToDo.css';

import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {Main} from "./components/Products/Main";
import {Products} from './components/Products/Products';
import {Product} from './components/Products/Product';
import './components/Products/prod.css';

import Input from './components/input';
import {UsersList} from './components/UsersList/UsersList';
import User from './components/UsersList/User';
import OrderForm from './components/OrderForm/OrderForm';

import ToDo from './components/ToDoList_pure/ToDo';

import todoApp from './reducers/index';
import TodoApp from './components/ToDoList/TodoApp';

let store = createStore(todoApp);

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
                <br/>
                <Router>
                    <nav>
                        <NavLink activeClassName="active" exact to="/"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Main</NavLink>
                        <NavLink activeClassName="active" to="/products"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Products</NavLink>

                        <NavLink activeClassName="active" to="/users"
                                 activeStyle={{color: "green", fontWeight: "bold"}}>Users</NavLink>
                        <Switch>
                            <Route exact path="/" component={Main}/>
                            <Route exact path="/products" component={Products}/>
                            <Route exact path="/product/:id(\d+)" component={Product}/>

                            <Route exact path="/users" component={UsersList}/>
                            <Route path="/users/:id(\d+)" component={User}/>
                        </Switch>
                    </nav>
                </Router>
                <ToDo/>  {/*старый вариант реализации - без Redux*/}
                <br/>
                <Provider store={store}>
                    <TodoApp/>
                </Provider>

                <OrderForm id="form_1" formMethod="post" formAction="#" formName="form_submit"/>
            </div>
        );
    }
}

export default App;