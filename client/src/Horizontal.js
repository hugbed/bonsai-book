import styled from 'styled-components';

// todo: these could be put somewhere else {
// so they are reusable
const Horizontal = styled.div`
  padding: 7px;
  display: flex;
  & > a, & > div, & > label {
    margin-right: 4px;
  }
`;

const HorizontalSpaced = Horizontal.extend`
  justify-content: space-between;
`;

export {
  Horizontal,
  HorizontalSpaced
};