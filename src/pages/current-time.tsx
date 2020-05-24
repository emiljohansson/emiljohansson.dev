import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import CurrentTime from '../components/CurrentTime'

const CurrentTimePage = () => {
  const [ x ]: any = React.useState(true)
  return (
    <Layout>
      <SEO
        title="Current Time"
        description="Current time"
      />
      {/* <button onClick={() => setX(!x)}>toggle</button> */}
      {x ? <CurrentTime /> : <div />}
    </Layout>
  )
}

export default CurrentTimePage
