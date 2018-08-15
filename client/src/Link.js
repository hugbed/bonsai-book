import React from 'react';
import history from './history';
import styled from 'styled-components';

class Link extends React.Component {
  transition = event => {
    event.preventDefault();
    history.push({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search
    });
  };

  render() {
    return (
      <A href={this.props.to} onClick={this.transition}>{this.props.children}</A>
    )
  }
}

const A = styled.a`
  text-decoration:none;
`;

export default Link;