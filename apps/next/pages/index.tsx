import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GitHubLogoIcon, MoonIcon, SunIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
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
    href: 'https://pw.emiljohansson.dev',
    text: 'Password Manager',
    external: true,
  },
  {
    href: 'https://remix.emiljohansson.dev',
    text: 'Remix',
    external: true,
  },
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
  // {
  //   href: '/rsc',
  //   text: 'React Server Components',
  // },
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
      <div className="h-screen p-3 m-0 max-w-md mx-auto">
        {projects.map(({ text, href, external }, index) => (
          <Link href={href} key={index}>
            <a
              className="link dark:bg-black-900 flex items-center shadow-lg rounded-2xl p-4 m-3 relative"
              target={external ? '_blank' : undefined}
            >
              {text} {
                external && <ExternalLinkIcon width={18} height={18} className="absolute right-3" />
              }
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default HomePage
