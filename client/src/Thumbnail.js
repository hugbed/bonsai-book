import styled, { css } from 'styled-components';

// this is not really reusable for now
// but when it will be needed again,
// refactor this to prevent code duplication
const Thumbnail = styled.div`
  height: 100%;
  width: 40%;
  float: right;
  position: relative;
  ${props => props.url && css`
    background: url(\"${props.url}\") center no-repeat;
    background-size: 150px;
  `}
`;

export default Thumbnail;