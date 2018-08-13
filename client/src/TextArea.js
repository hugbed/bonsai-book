import React, { Component } from 'react';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({value: value});
        this.props.onChange(value);
    }

    render() {
        return (
            <textarea
                style={this.props.style}
                cols={this.props.cols}
                rows={this.props.rows}
                value={this.state.value} onChange={(event) => this.handleChange(event)} />
        );
    }
}


export default TextArea;