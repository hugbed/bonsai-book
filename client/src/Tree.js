import React, { Component } from 'react';
import Label from './Label';
import Link from './Link';
import Card from './Card';
import { Horizontal, HorizontalSpaced } from './Horizontal';
import { EditButton, TrashButton } from './IconButton';
import { dateToString } from './DateUtils';
import styled from 'styled-components';

class Tree extends Component {
    renderEditBar() {
        if (this.props.editable === false) {
            return "";
        }
        return (
            <Horizontal>
                <Link to={`/timeline?id=${this.props.tree.id}`}><EditButton></EditButton></Link>
                <TrashButton onClick={() => this.props.onDelete()}></TrashButton>
            </Horizontal>
        );
    }

    render() {
      const tree = this.props.tree;
      const dateStr = dateToString(new Date(tree.acquisition_date));
    //   const comment = tree.acquisition_comment ? `(${tree.acquisition_comment})` : "";

      return (
        <Card>
          { this.renderEditBar() }
          <HorizontalSpaced style={{height: '175px'}}>
            <div>
              <Field name="Genus" value={tree.genus}></Field>
              <Field name="Species" value={tree.species}></Field>
              <Field style={{display: 'none'}} name="Family" value={tree.family}></Field>
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
        <FieldContainer style={this.props.style}>
          <Label> { this.props.name } </Label> : { this.props.value } { this.props.children }
        </FieldContainer>
      );
    }
  }
  
  const FieldContainer = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
  `;
  
  export default Tree;