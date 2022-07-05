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
  },
  {
    href: 'https://pw.emiljohansson.dev',
    text: 'Password Manager',
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
  {
    href: '/rsc',
    text: 'React Server Components',
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
