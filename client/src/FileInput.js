import React, { Component } from 'react';

import styled from 'styled-components';

class FileInput extends Component {
    render () {
        return (
            <FileInputStyled type="file" onChange={ (e) => this.props.onChange(e.target.files) } />
        );
    }
}

const FileInputStyled = styled.input`
    font-family: Lora;
    font-size: 13px;
`;

export default FileInput;