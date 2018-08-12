import React, { Component } from 'react';
import Link from '../Link';
import Label from '../Label';
import { Horizontal } from '../Horizontal';
import { PlusButton } from '../IconButton';
import Tree from '../Tree';

class TreeList extends Component {
  render() {
    return (
      <div>
        <Horizontal>
        <Link styles={{marginRight: '4px'}} to="/edit"><PlusButton></PlusButton></Link>
          <Label> Add a new tree </Label>
        </Horizontal>
        <div>
        { this.props.trees.map((tree, i) =>
            <Tree key={tree.id} tree={tree}/>) }
            </div>
      </div>
    );
  }
}

export default TreeList;
