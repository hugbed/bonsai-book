import React, { Component } from 'react';
import TreeTimeline from './TreeTimeline';
import TreeAPI from '../API/Tree';
import QueryString from 'query-string';
import styled from 'styled-components';

class TreeTimelinePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tree: {},
      timeline: [],
      offset: 0, // will be updated on scroll or something
      numberOfItems: 10
    };
  }

  componentWillMount() {
    const id = QueryString.parse(window.location.search).id;
    TreeAPI.findById(id)
      .then(tree => {
        this.setState({ ...this.state, tree: tree });
      });
    TreeAPI.fetchTimelineForTree(id, this.state.offset, this.state.numberOfItems)
      .then(timeline => {
        this.setState({ ...this.state, timeline: timeline});
      });
  }

  render() {
    return (
      <Contents>
        <TreeTimeline tree={this.state.tree} timeline={this.state.timeline} />
      </Contents>
    );
  }
}

// maybe share this across other pages
const Contents = styled.div`
  text-align: left;
  width: 60%;
  min-width: 630px;
  max-width: 727px;
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 75px;
  padding-right: 75px;
  background-color: #f1f1f1;
`;

export default TreeTimelinePage;
