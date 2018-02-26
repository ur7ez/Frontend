import React from "react";
import {Link} from 'react-router-dom'

export default class Item extends React.Component {
    render() {
        return (
            <li><Link to={`/users/${this.props.item.id}`}>{this.props.item.name}</Link></li>
        )
    }
}