import { Label } from '@radix-ui/react-label'

const HomePage = () => {
  return (
    <>
      <h1>Password Manager</h1>
      <form action="/accounts" method="get">
        <div className="mb-3">
          <Label htmlFor="secret" className="block pr-3">Secret</Label>
          <input id="secret" name="secret" className="input" />
        </div>
        <div className="mb-3">
          <Label htmlFor="userId" className="block pr-3">User ID</Label>
          <input id="userId" name="userId" className="input" />
        </div>
        <button className="btn-primary">Load accounts</button>
      </form>
    </>
  )
}

export default HomePage
