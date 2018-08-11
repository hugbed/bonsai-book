import React from 'react';
import history from './history';

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
      <a href={this.props.to} onClick={this.transition}>{this.props.children}</a>
    )
  }
}

export default Link;