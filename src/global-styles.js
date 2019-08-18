import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Arial, Helvetica, Arial, sans-serif;
    font-size: 18px;
    line-height: 1.4;
  }

  h1,h2,h3,h4,h5,h6 {
    color: #444;
    line-height: 1.1;
  }

  h1 + *,
  h2 + *,
  h3 + *,
  h4 + *,
  h5 + *,
  h6 + * {
    margin-top: 0.5rem;
  }

  #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
