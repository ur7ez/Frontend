import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {About, Product, Products} from './components/myRoute';
import Input from './components/input';
import OrderForm from './components/OrderForm/OrderForm';
import logo from './logo.svg';
import './App.css';

// import Button from './components/button';

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
                    <nav style={{listStyle: 'none'}}>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/product">Product 1</Link></li>
                        <Switch>
                            <Route exact path="/" component={About}/>
                            <Route exact path="/products" component={Products}/>
                            <Route exact path="/product" component={Product}/>
                        </Switch>
                    </nav>
                </Router>
                <br/>
                <OrderForm id="form_1" formMethod="post" formAction="#" formName="form_submit"/>
            </div>
        );
    }
}

export default App;