import { useEffect, useState } from 'react'
import Link from 'next/link'
import { styled } from '@/stitches'
import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Layout from '@/components/Layout'
import Head from 'next/head'

const projects = [
  {
    href: '/random-string',
    text: 'Random String',
  },
  {
    href: '/current-time',
    text: 'Current Time',
  },
  {
    href: '/two-way-auth-generate',
    text: 'Two-Factor Authentication - Generate Code',
  },
  {
    href: '/two-way-auth-enter',
    text: 'Two-Factor Authentication - Enter Code',
  },
  {
    href: '/progress-bar',
    text: 'Progress Bar',
  },
  {
    href: '/confirm-button',
    text: 'Confirm Button',
  },
  {
    href: '/ms',
    text: 'ms',
  },
]

const Github = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '2rem',
  height: '100vh',
  textAlign: 'center',
})

const MainLink = styled('h1', {
  margin: '0 auto',
})

const List = styled('ul', {
  height: '100vh',

  li: {
    marginLeft: '1.5rem',
  },
})

const HomePage = () => {
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
        className="dark:text-white absolute right-0 cursor-pointer inline-block p-2 m-3"
        onClick={() => setDarkMode(!darkMode)}
        data-test-id="toggle-dark-mode"
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
            <a className="px-2 pb-2" target="_blank" rel="noreferrer">
              <GitHubLogoIcon width="38" height="38" className="inline-block" />{' '}
              emiljohansson
            </a>
          </Link>
        </MainLink>
      </Github>
      <List className="list-disc p-3 m-0">
        {projects.map(({ text, href }, index) => (
          <li className="mb-2" key={index}>
            <Link href={href}>
              <a>{text}</a>
            </Link>
          </li>
        ))}
      </List>
    </Layout>
  )
}

export default HomePage
