import styled from 'styled-components'

export const StyledWrapper = styled.div`
  h3 {
    font-size: 1.5rem;
    line-height: 1.2rem;

    margin: 2rem 0 0 0;
  }

  .wrapper-send-camp {
    width: 100%;

    display: grid;
    grid-template-columns: 90fr 10fr;
    column-gap: 1.5rem;

    margin: 1rem 0 0 0;

    input {
      border-radius: 8px;
      border: solid 0.0625rem #898989;

      font-size: 1rem;

      padding: 0.2rem;
    }

    button {
      border: none;
      border-radius: 8px;

      color: #fff;

      background: #280633;
    }
  }
`
