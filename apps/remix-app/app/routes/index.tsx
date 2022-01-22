import { Link } from 'remix'

export default function Index() {
  return (
    <>
      <Link to="/projects" prefetch="intent">
        Projects
      </Link>
    </>
  )
}
