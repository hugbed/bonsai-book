import React, { Component } from 'react';

class FileInput extends Component {
    render () {
        return (
            <input type="file" onChange={ (e) => this.props.onChange(e.target.files) } />
        );
    }
}

export default FileInput;