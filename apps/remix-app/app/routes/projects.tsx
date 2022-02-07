import {
  Form,
  Link,
  Outlet,
  LoaderFunction,
  useLoaderData,
  useTransition,
  ActionFunction,
} from 'remix'

type Project = {
  slug: string
  title: string
}

let id = 1
const projects: Project[] = [
  {
    slug: id.toString(),
    title: 'test',
  },
]

export const loader: LoaderFunction = async () => {
  return projects
}

export const action: ActionFunction = async ({ request }) => {
  id++
  const form = await request.formData()
  const project = {
    slug: id.toString(),
    title: form.get('title')?.toString() || '',
  }
  projects.push(project)
  console.log(projects)
  return project
}

export default function Index () {
  const projects = useLoaderData()
  const { state } = useTransition()
  const busy = state === 'submitting'

  return (
    <>
      <div className="bg-slate-300 text-blue-400">
        {projects.map(({ slug, title }: Project) => (
          <Link key={slug} to={slug}>
            {title}
          </Link>
        ))}
        <Form method="post">
          <input name="title" />
          <button type="submit" disabled={busy}>
            {busy ? 'Creating...' : 'Create New Project'}
          </button>
        </Form>
      </div>
      <div>OUTLET:</div>
      <Link to="." prefetch="intent">
        All
      </Link>
      <Link to="1" prefetch="intent">
        first project
      </Link>
      <div>
        <Outlet />
      </div>
      <div>end</div>
    </>
  )
}
