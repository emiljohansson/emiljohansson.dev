import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { fonts } from '../styles/variables'

interface Props {
  children: any
}

const GlobalStyle = createGlobalStyle`
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
  #___gatsby,
  #gatsby-focus-wrapper,
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

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <>
        <GlobalStyle />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <main>{children}</main>
        <footer></footer>
      </>
    )}
  />
)

export default Layout
