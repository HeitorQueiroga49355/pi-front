import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    font-family: 'Poppins';
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'fontello';
    src: url('../../fonts/fontello.ttf?92468104') format('truetype'),
      url('../fonts/fontello.svg?92468104#fontello') format('svg');
  }
`
