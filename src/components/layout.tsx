import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import './layout.scss'

interface Props {
  children: any
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper,
  main {
    height: 100%;
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
