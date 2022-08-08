import Link from 'next/link'
import Head from 'next/head'
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import Layout from '@/components/Layout'
import { ThemeToggle } from 'shared/ThemeToggle'

// const AccessibleIcon = ({ children, label }): AccessibleIconPrimitive.AccessibleIcon => {
//   <AccessibleIconPrimitive.Root
//     label={label}
//   >
//     {children}
//   </AccessibleIconPrimitive.Root>
// }

const projects = [
  {
    href: 'https://design.emiljohansson.dev',
    text: 'Design System',
    external: true,
    description: 'Design system for the apps developed by Emil Johansson.',
    test: 'design-system',
  },
  {
    href: 'https://pw.emiljohansson.dev',
    text: 'Password Manager',
    external: true,
    description: 'Password manager for the apps developed by Emil Johansson.',
    test: 'password-manager',
  },
  {
    href: '/random-string',
    text: 'Random String',
    description: 'Generate a random string of characters.',
    test: 'random-string',
  },
  {
    href: '/current-time',
    text: 'Current Time',
    description: 'Get the current time.',
    test: 'current-time',
  },
  {
    href: '/two-way-auth-generate',
    text: 'Two-Factor Authentication - Generate Code',
    description: 'Generate a two-factor authentication code.',
    test: 'two-way-auth-generate',
  },
  {
    href: '/two-way-auth-enter',
    text: 'Two-Factor Authentication - Enter Code',
    description: 'Enter a two-factor authentication code.',
    test: 'two-way-auth-enter',
  },
  {
    href: '/progress-bar',
    text: 'Progress Bar',
    description: 'Progress bar with a percentage.',
    test: 'progress-bar',
  },
  {
    href: '/confirm-button',
    text: 'Confirm Button',
    description: 'Hold down the button to confirm the action.',
    test: 'confirm-button',
  },
  {
    href: '/ms',
    text: 'Mine Sweaper',
    description: 'Mine sweaper game.',
    test: 'mine-sweaper',
  },
  {
    href: '/calculate',
    text: 'Calculate',
    description: 'Calculate a mathematical expression from an API route.',
    test: 'calculate',
  },
  // {
  //   href: '/rsc',
  //   text: 'React Server Components',
  //   description: 'React Server Components.',
  // },
  {
    href: '/hooks',
    text: 'Hooks',
    description: 'Custom React Hooks.',
    test: 'hooks',
  },
]

// background: #252736;
// padding: 18px;
// border-radius: 16px;

const HomePage = () => {
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

      <ThemeToggle />
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
        {projects.map(({ text, href, description, external, test }, index) => (
          <Link href={href} key={index}>
            <a
              className="
                flex flex-col link shadow-md rounded-2xl p-4 m-3 relative
                ease-in-out duration-100
                hover:no-underline hover:-translate-y-1 hover:shadow-lg
                dark:bg-black-900 dark:shadow-lg-white
              "
              target={external ? '_blank' : undefined}
              data-test={test}
            >
              <span className="flex items-center mb-1">{text} {
                external && <ExternalLinkIcon width={18} height={18} className="absolute right-3" />
              }</span>
              <p className="text-gray-600 text-xs no-underline">{description}</p>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default HomePage
