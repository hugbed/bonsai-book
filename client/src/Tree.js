import React, { Component } from 'react';
import Label from './Label';
import Link from './Link';
import Card from './Card';
import { Horizontal, HorizontalSpaced } from './Horizontal';
import { EditButton, TrashButton } from './IconButton';
import { dateToString } from './DateUtils';
import styled from 'styled-components';
import TreeAPI from './API/Tree';

class Tree extends Component {
    constructor(props) {
      super(props);
      this.state = {
        photo: {}
      };
    }

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

    componentDidMount() {
      if (this.props.tree !== undefined) {
        this.fetchLastPhotoOfTree();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.tree !== undefined && this.props.tree.id !== prevProps.tree.id) {
        this.fetchLastPhotoOfTree();
      }
    }

    fetchLastPhotoOfTree() {
      if (this.props.tree.id !== undefined) {
        TreeAPI.fetchLastPhotoOfTree(this.props.tree.id)
          .then((photo) => console.log(this.setState({...this.state, photo: photo})));
      }
    }

    renderImg() {
      let img = <img/>;
      if (this.state.photo !== undefined && this.state.photo.filepath !== undefined) {
        img = <img
                style={{height: '100%', width: 'auto'}}
                alt={this.state.photo.filepath}
                src={`/trees/tree/photo/file/${this.state.photo.filepath}`}/>;
      }
      return img;
    }

    render() {
      const tree = this.props.tree;
      const dateStr = dateToString(new Date(tree.acquisition_date));

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
            { this.renderImg() }
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