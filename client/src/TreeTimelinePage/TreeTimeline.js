import React, { Component } from 'react';

class TreeTimeline extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div style={{margin: '25px'}}>{ JSON.stringify(this.props.tree) }</div>
        <div style={{margin: '25px'}}>{ JSON.stringify(this.props.timeline) }</div>
      </div>
    );
  }
}

export default TreeTimeline;
