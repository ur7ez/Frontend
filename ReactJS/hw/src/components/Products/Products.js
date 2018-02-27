import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {Product} from './Product'

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentWillMount() {
        let prods_url = 'https://ur7ez.000webhostapp.com/products.json';
        fetch(prods_url)
            .then(response => response.json())
            .then(products => this.setState({products: products.slice(0, 10)}));
    }

    render() {
        return (
            <div>
                <h2>Список продуктов</h2>
                <ul>
                    {
                        this.state.products.map(prod =>
                            <Router key={prod.id}>
                                <li><Link to={`/product/${prod.id}`}>{prod.product} (id: {prod.id})</Link>
                                    <Switch>
                                        <Route path={`/product/${prod.id}`}
                                               render={(props) => <Product product={prod} {...props}/>}/>
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