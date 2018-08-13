import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    change(event) {
        this.setState({ value: event.target.value });
        this.props.onChange(event.target.value);
    }

    render() {
        return(
            <select style={{marginLeft: '10px'}} onChange={(event) => this.change(event)} value={this.state.value}>
                { this.props.values.map((value, i) => 
                    <option key={i} value={value}>{value}</option>) }
            </select>
        );
    }
}

export default Select;