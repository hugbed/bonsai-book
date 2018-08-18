import React, { Component } from 'react';

import Style from './Style';

import styled from 'styled-components';

class TextArea extends Component {
    handleChange(event) {
        const value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        return (
            <TextAreaContainer
                style={this.props.style}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                value={this.props.value} onChange={(event) => this.handleChange(event)} />
        );
    }
}

const TextAreaContainer = styled.textarea`
    ${Style}
    resize: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
         box-sizing: border-box;
    outline: none;
`;


export default TextArea;