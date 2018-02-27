import React from "react";

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.match.params.id, product: []};
    }

    componentWillMount() {
        if (this.props.product === undefined) {
            let prods_url = 'https://ur7ez.000webhostapp.com/products.json';
            fetch(prods_url)
                .then(response => response.json())
                .then(products => {
                        this.setState({product: products[this.state.id - 1]})
                    }
                );
        } else {
            this.setState({product: this.props.product})
        }
    }

    render() {
        return (
            <div className="product_desc">
                <h2>Продукт №:{this.state.product.id} (<em>{this.state.product.product}</em>)</h2>
                <p><span>Price: </span>{this.state.product.price}</p>
                <p><span>Category: </span>{this.state.product.category}</p>
                <p><span>Seller: </span>{this.state.product.seller}</p>
                <p><span>Description: </span>{this.state.product.description}</p>
            </div>
        );
    }
}