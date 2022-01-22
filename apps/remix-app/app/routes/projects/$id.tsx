import { LoaderFunction, useLoaderData } from 'remix'

type LoaderData = {
  text: string
  isOwner: boolean
}

async function getUserId(request: Request) {
  return 1
}

async function findUnique(query: any) {
  return {
    id: 1,
    text: 'abc item',
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('----loader for id')
  const userId = await getUserId(request)
  const item = await findUnique({ where: { id: params.id } })
  if (!item) {
    throw new Response('What a joke! Not found.', { status: 404 })
  }
  const data: LoaderData = {
    text: item.text,
    isOwner: userId === item.id,
  }
  console.log(data)

  return data
}

export default function Invoice() {
  const data = useLoaderData<LoaderData>()

  return (
    <div>
      <div>text: {data.text}</div>
      <div>isOwner: {data.isOwner.toString()}</div>
    </div>
  )
}
