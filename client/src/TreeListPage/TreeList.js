import React, { Component } from 'react';
import Link from '../Link';
import Label from '../Label';
import { Horizontal } from '../Horizontal';
import { PlusButton } from '../IconButton';
import AddTree from './AddTree';
import Tree from '../Tree';
import styled from 'styled-components';

class TreeList extends Component {
  render() {
    return (
      <div>
        <details>
            <Summary>Add a new tree</Summary>
            <div>
              <AddTree />
            </div>
        </details>
        <div>
        { this.props.trees.map((tree, i) =>
            <Tree key={tree.id} tree={tree}/>) }
            </div>
      </div>
    );
  }
}

// todo: no copy pasta from TreeTimeline.js please
const Summary = styled.summary`
  padding: 7px;
  margin: 7px;
  cursor: pointer;
  outline: none;
`;

export default TreeList;
