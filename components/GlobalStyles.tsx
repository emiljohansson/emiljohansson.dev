import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme } from 'twin.macro'
import { fonts } from '../src/styles/variables'

const CustomStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    font-family: ${fonts.baseFontFamily};
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
  }

  html,
  body,
  #__next,
  main {
    height: 100%;
  }

  a {
    background-color: transparent;
    color: #282a36;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  a,
  button,
  input {
    &:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
  }
`

const GlobalStyles = () => (
  <>
    <CustomStyles />
  </>
)

export default GlobalStyles
