import { useEffect, useState } from 'react'
import Link from 'next/link'
import { styled } from '@/stitches'
import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
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

  li: {
    marginLeft: '1.5rem',
  },
})

const IndexPage = () => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (darkMode === undefined) {
      setDarkMode(document.documentElement.classList.contains('dark'))
      return
    }
    localStorage.setItem(
      'theme',
      darkMode
        ? 'dark'
        : '',
    )
    document.documentElement.classList.toggle('dark', localStorage.theme === 'dark')
  }, [darkMode])

  return (
    <Layout>
      <Head>
        <title>Welcome to emiljohansson.dev | emiljohansson.dev</title>
        <meta name="description" content="Playground for Emil Johansson" />
        <meta
          name="keywords"
          content="emil, johansson, developer, front-end, front end"
        />
      </Head>
      <button
        className="dark:text-white float-right cursor-pointer inline-block p-2"
        onClick={() => setDarkMode(!darkMode)}
      >
        <span className="sr-only">Use {darkMode ? 'dark' : 'light'} mode</span>
        {
          darkMode
            ? <MoonIcon className="block" width="24" height="24" />
            : <SunIcon className="block" width="24" height="24" />
        }
      </button>
      <Github>
        <MainLink>
          <Link href="https://github.com/emiljohansson" passHref>
            <a target="_blank" rel="noreferrer">
              <GitHubLogoIcon width="38" height="38" className="inline-block" />{' '}
              emiljohansson
            </a>
          </Link>
        </MainLink>
      </Github>
      <List className="list-disc p-3 m-0">
        <li>
          <Link href="/random-string">
            <a>Random String</a>
          </Link>
        </li>
        <li>
          <Link href="/current-time">
            <a>Current Time</a>
          </Link>
        </li>
        <li>
          <Link href="/two-way-auth-generate">
            <a>Two-Factor Authentication - Generate Code</a>
          </Link>
        </li>
        <li>
          <Link href="/two-way-auth-enter">
            <a>Two-Factor Authentication - Enter Code</a>
          </Link>
        </li>
        <li>
          <Link href="/progress-bar">
            <a>Progress Bar</a>
          </Link>
        </li>
        <li>
          <Link href="/confirm-button">
            <a>Confirm Button</a>
          </Link>
        </li>
        <li>
          <Link href="/ms">
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
}

export default IndexPage
