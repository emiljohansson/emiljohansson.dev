import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

// const AccessibleIcon = ({ children, label }): AccessibleIconPrimitive.AccessibleIcon => {
//   <AccessibleIconPrimitive.Root
//     label={label}
//   >
//     {children}
//   </AccessibleIconPrimitive.Root>
// }

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
  {
    href: '/calculate',
    text: 'calculate',
  },
  {
    href: '/rsc',
    text: 'React Server Components',
  },
]

const darkClassName = 'dark'

let savedDarkMode: boolean | undefined

// background: #252736;
// padding: 18px;
// border-radius: 16px;

const HomePage = () => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(savedDarkMode)

  useEffect(() => {
    if (darkMode === undefined) {
      setDarkMode(document.documentElement.classList.contains(darkClassName))
      savedDarkMode = document.documentElement.classList.contains(darkClassName)
      return
    }
    localStorage.setItem(
      'theme',
      darkMode
        ? darkClassName
        : '',
    )
    document.documentElement.classList.toggle(darkClassName, localStorage.theme === darkClassName)
    savedDarkMode = document.documentElement.classList.contains(darkClassName)
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
      <motion.button
        className="dark:text-white absolute right-0 cursor-pointer inline-block p-2 m-3"
        onClick={() => setDarkMode(!darkMode)}
        data-test-id="toggle-dark-mode"
      >
        <motion.div
          initial={{
            scale: darkMode === undefined ? 0.5 : 1,
            opacity: darkMode === undefined ? 0 : 1,
            y: darkMode === undefined ? '-100%' : 0,
          }}
          animate={{
            scale: darkMode === undefined ? 0.5 : 1,
            opacity: darkMode === undefined ? 0 : 1,
            y: darkMode === undefined ? '-100%' : 0,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="sr-only">Use {darkMode ? 'dark' : 'light'} mode</span>
          {
            darkMode
              ? <MoonIcon className="block" width="24" height="24" />
              : <SunIcon className="block" width="24" height="24" />
          }
        </motion.div>
      </motion.button>
      <div className="flex items-center text-5xl h-screen font-bold">
        <h1 className="mx-auto">
          <Link href="https://github.com/emiljohansson" passHref>
            <a className="px-2 pb-2" target="_blank" rel="noreferrer">
              <AccessibleIcon
                label="GitHub"
              >
                <GitHubLogoIcon
                  color="#ad52dd"
                  width="50"
                  height="50"
                  className="inline-block"
                />
              </AccessibleIcon>
              {' '}
              <style jsx>{`
                .title {
                  background: linear-gradient(97.2deg,#ad52dd -8.65%,#e64937 110.27%);
                  background-clip: border-box;
                  background-clip: border-box;
                  -webkit-text-fill-color: transparent;
                  -webkit-background-clip: text;
                }
              `}</style>
              <span className="title">emiljohansson</span>
            </a>
          </Link>
        </h1>
      </div>
      <ul className="h-screen list-disc p-3 m-0">
        {projects.map(({ text, href }, index) => (
          <li className="mb-2 ml-6" key={index}>
            <Link href={href}>
              <a>{text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default HomePage
