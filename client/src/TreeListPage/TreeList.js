import React, { Component } from 'react';
import Card from '../Card';
import Link from '../Link';
import Label from '../Label';
import { Horizontal, HorizontalSpaced } from '../Horizontal';
import { PlusButton, EditButton, TrashButton } from '../IconButton';
import styled from 'styled-components';

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

class Tree extends Component {
  render() {
    const tree = this.props.tree;
    const date = new Date(tree.acquisition_date);
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const comment = tree.acquisition_comment ? `(${tree.acquisition_comment})` : "";
    return (
      <Card>
        <Horizontal>
          <Link to={`/edit?id=${this.props.tree.id}`}><EditButton></EditButton></Link>
          <TrashButton onClick={() => this.props.onDelete()}></TrashButton>
        </Horizontal>
        <HorizontalSpaced style={{height: '175px'}}>
          <div>
            <Field name="Genus" value={tree.genus}></Field>
            <Field name="Species" value={tree.species}></Field>
            {/* <Field name="Family" value={tree.family}></Field> */}
            <Field name="Acquired on" value={dateStr}></Field>
            <Field name="At (approximately)" value={tree.acquisition_age}> year(s) old</Field>
            <Field name="From" value={tree.acquisition_type}></Field>
            <Field name="Location" value={tree.acquisition_location}></Field>
            {/* <Field name="" value={comment}></Field> */}
          </div>
          {/* {this.renderThumbnail()} */}
        </HorizontalSpaced>

      </Card>
    )
  }
}

class Field extends Component {
  render() {
    return (
      <FieldContainer>
        <Label> { this.props.name } </Label> : { this.props.value } { this.props.children }
      </FieldContainer>
    );
  }
}

const FieldContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

export default TreeList;
