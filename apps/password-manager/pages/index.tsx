const HomePage = () => {
  return (
    <>
      <h1>Password Manager</h1>
      <form action="/accounts" method="get">
        <input name="secret" />
        <input name="userId" />
        <button>Load accounts</button>
      </form>
    </>
  )
}

export default HomePage
