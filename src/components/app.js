import React from 'react';
import styled from 'styled-components';
import Todo from './todo';
import GlobalStyles from '../global-styles';

function App() {
  return (
    <AppWrapper id="app-wrapper">
      <Todo />
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100%;
`;
