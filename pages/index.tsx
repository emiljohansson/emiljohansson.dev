import Link from 'next/link'
import { styled } from '@/stitches'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Layout from '@/components/Layout'
import Head from 'next/head'

const Github = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '2rem',
  height: '100vh',
  textAlign: 'center',
})

const MainLink = styled('a', {
  margin: '0 auto',
})

const List = styled('ul', {
  height: '100vh',
  padding: '1rem',
  margin: '0',

  'li': {
    marginLeft: '1.5rem',
  }
})

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
        <GitHubLogoIcon
          width="38"
          height="38"
          className="inline-block"
        /> emiljohansson
      </MainLink>
    </Github>
    <List className="list-disc">
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
