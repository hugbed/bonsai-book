import React, { Component } from 'react';
import Link from './Link';
import styled from 'styled-components';

class SiteHeader extends Component {
  render() {
    return (
      <Header className="site-header">
        <Link to="/">
          <SiteTitle>Bonsai Tree Book</SiteTitle>
        </Link>
      </Header>
    );
  }
}

const Header = styled.header`
  background-color: #222;
  padding: 20px;
  grid-area: header;
`;

const SiteTitle = styled.h1`
  font-size: 1.5em;
  font-size: 1.5em;
  color: white;
  text-align: center;
`;

export default SiteHeader;
