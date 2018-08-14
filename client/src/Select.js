import React, { Component } from 'react';

import Style from './Style';

import styled from 'styled-components';

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
            <SelectContainer onChange={(event) => this.change(event)} value={this.state.value}>
                { this.props.values.map((value, i) => 
                    <option key={i} value={value}>{value}</option>) }
            </SelectContainer>
        );
    }
}

const SelectContainer = styled.select`
    ${Style}
`;

export default Select;