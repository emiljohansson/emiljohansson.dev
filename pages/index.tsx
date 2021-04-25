import Link from 'next/link'
import styled from 'styled-components'
import { Github as GithubIcon } from '@styled-icons/boxicons-logos/Github'
import Layout from '../components/Layout'
import Head from 'next/head'

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

const IndexPage = () => (
  <Layout>
    <Head>
      <title>Welcome to emiljohansson.dev | emiljohansson.dev</title>
      <meta name="description" content="Playground for Emil Johansson" />
      <meta name="keywords" content="emil, johansson, developer, front-end, front end" />
    </Head>
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
          href="/random-string"
        >
          <a>Random String</a>
        </Link>
      </li>
      <li>
        <Link
          href="/current-time"
        >
          <a>Current Time</a>
        </Link>
      </li>
      <li>
        <Link
          href="/two-way-auth-generate"
        >
          <a>Two-Factor Authentication - Generate Code</a>
        </Link>
      </li>
      <li>
        <Link
          href="/two-way-auth-enter"
        >
          <a>Two-Factor Authentication - Enter Code</a>
        </Link>
      </li>
      <li>
        <Link
          href="/progress-bar"
        >
          <a>Progress Bar</a>
        </Link>
      </li>
      <li>
        <Link
          href="/confirm-button"
        >
          <a>Confirm Button</a>
        </Link>
      </li>
      <li>
        <Link
          href="/ms"
        >
          <a>ms</a>
        </Link>
      </li>
      {/* <li>
        <Link
          href="/chat"
        >
          <a>Chat</a>
        </Link>
      </li> */}
    </List>
  </Layout>
)

export default IndexPage
