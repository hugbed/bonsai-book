import React, { Component } from 'react';
import SiteHeader from '../SiteHeader';
import TreeListPage from '../TreeListPage/TreeListPage';
import TreeTimelinePage from '../TreeTimelinePage/TreeTimelinePage';
import ReactDOM from 'react-dom';
import history from '../history';
import UniversalRouter from 'universal-router';
import styled from 'styled-components';
import './App.css';

const routes = [
  { path: '/', action: () => <TreeListPage /> },
  { path: '/timeline', action: () => <TreeTimelinePage /> }
];
const router = new UniversalRouter(routes);

class App extends Component {
  async renderPage() {
    return await router.resolve({ pathname: '/' })
  }

  renderCurrentPage() {
    router.resolve({ pathname: window.location.pathname }).then(component => {
      ReactDOM.render(component, document.getElementById('current-page-container'))
    });
  }

  componentWillMount() {
    history.listen((location, action) => {
      this.renderCurrentPage();
    });
  }

  render() {
    this.renderCurrentPage();
    return (
      <Container>
        <SiteHeader/>
        <div id="current-page-container"></div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
