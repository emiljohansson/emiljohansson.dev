import type { NextPage } from 'next'
import Cryptr from 'cryptr'

interface Account {
  username: string
  password: string
  plaintext: string
}

const Home: NextPage<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <>{
      accounts.map((account, index) => (
        <div key={index}>
          <p>{account.username}</p>
          <p>{account.password}</p>
          <p>{account.plaintext}</p>
        </div>
      ))
    }</>
  )
}

export default Home

export async function getStaticProps () {
  const cryptr = new Cryptr('myTotallySecretKey')
  const database = {
    accounts: [
      {
        username: 'aa@xx.zz',
        password: cryptr.encrypt('password123'),
        plaintext: 'password123',
      },
      {
        username: 'bb@xx.zz',
        password: cryptr.encrypt('greatpassword123'),
        plaintext: 'greatpassword123',
      },
    ] as Account[],
  }

  return {
    props: {
      accounts: database.accounts,
    },
  }
}
