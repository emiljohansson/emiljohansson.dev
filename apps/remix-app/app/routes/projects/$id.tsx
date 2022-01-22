import { LoaderFunction, useLoaderData } from 'remix'

type LoaderData = {
  text: string
  isOwner: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getUserId (request: Request) {
  return 1
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function findUnique (query: { where: { id?: string } }) {
  return {
    id: 1,
    text: 'abc item',
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const item = await findUnique({ where: { id: params.id } })

  if (!item) {
    throw new Response('What a joke! Not found.', { status: 404 })
  }
  const data: LoaderData = {
    text: item.text,
    isOwner: userId === item.id,
  }

  return data
}

export default function Invoice () {
  const data = useLoaderData<LoaderData>()

  return (
    <div>
      <div>text: {data.text}</div>
      <div>isOwner: {data.isOwner.toString()}</div>
    </div>
  )
}
