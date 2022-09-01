import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Card Games</title>
        <meta name="description" content="Card Games" />
      </Head>

      <main>
        <h1>
          Card Games
        </h1>
        <ul>
          <li>
            <Link href="/idiot">
              <a>Idioten (The idiot)</a>
            </Link>
          </li>
        </ul>
      </main>
    </>
  )
}

export default HomePage
