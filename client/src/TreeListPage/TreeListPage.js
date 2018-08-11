import React, { Component } from 'react';
import TreeList from './TreeList';
import TreeAPI from '../API/Tree';
import styled from 'styled-components';

class TreeListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trees: []
    };
  }

  componentWillMount() {
      TreeAPI.fetchAll()
        .then(trees => this.setState({ trees: trees}));
  }

  render() {
    return (
      <Contents>
        <TreeList trees={this.state.trees} />
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

export default TreeListPage;
