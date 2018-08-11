import React from 'react';
import styled from 'styled-components';

const IconDiv = styled.button`
  display: inline-block;
  height: ${props => props.height ? props.height : '25px'};
  width: ${props => props.width ? props.width : '25px'};
  border: 1px solid #ababab;
  border-radius: 4px;
  cursor: pointer;
  background: url(${props => props.url}) center no-repeat;
  background-size: 20px;
  border: 1px solid gray;
  margin-right: 4px;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${props => props.dark ? '#afafaf' : '#eaeaea'} ;
  }
  background-position: ${props => props.backgroundPosition};
  background-size: ${props => props.backgroundSize}
`;

const IconButton = IconDiv.withComponent('button');

const PlusButton = () => <IconDiv dark url="/plus-icon.png" />;
const EditButton = () => <IconDiv url="/edit-icon.png" />;
const TrashButton = () => {
  return(
    <IconButton
      url="/trash-icon.png"
      backgroundPosition="bottom 0px right 0px"
      backgroundSize="25px"
      />
  );
}

export {
  PlusButton,
  EditButton,
  TrashButton
}