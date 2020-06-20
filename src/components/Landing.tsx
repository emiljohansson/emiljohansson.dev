import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Github as GithubIcon } from '@styled-icons/boxicons-logos/Github'

const Github = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  height: 100vh;
  text-align: center;
`

const MainLink = styled.a`
  margin: 0 auto;
`

const List = styled.ul`
  height: 100vh;
  padding: 1rem;
  margin: 0;

  li {
    margin-left: 1.5rem;
  }
`

const Landing = () => (
  <>
    <Github>
      <MainLink
        href="https://github.com/emiljohansson"
        target="_blank"
      >
        <GithubIcon size="38" /> emiljohansson
      </MainLink>
    </Github>
    <List>
      <li>
        <Link
          to="/random-string/"
        >Random String</Link>
      </li>
      <li>
        <Link
          to="/current-time/"
        >Current Time</Link>
      </li>
      <li>
        <Link
          to="/two-way-auth-generate/"
        >Two-Factor Authentication - Generate Code</Link>
      </li>
      <li>
        <Link
          to="/two-way-auth-enter/"
        >Two-Factor Authentication - Enter Code</Link>
      </li>
      <li>
        <Link
          to="/progress-bar/"
        >Progress Bar</Link>
      </li>
      <li>
        <Link
          to="/confirm-button/"
        >Confirm Button</Link>
      </li>
      {/* <li>
        <Link
          to="/chat/"
        >Chat</Link>
      </li> */}
    </List>
  </>
)

export default Landing