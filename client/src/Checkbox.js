import React, { Component } from 'react';

import styled from 'styled-components';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    this.setState({
      checked: value
    });
    this.props.onChange(value);
  }

  render() {
    return (
      <CheckboxInput
          name={this.props.name}
          type="checkbox"
          checked={this.state.checked}
          onChange={(event) => this.handleInputChange(event)} />
    );
  }
}

const CheckboxInput = styled.input`
  margin-left: 5px;
  margin-right: 5px;
`;

export default Checkbox;