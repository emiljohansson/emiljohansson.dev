import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Landing from '../components/Landing/Landing'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Welcome to emiljohansson.dev"
      keywords={[`emil`, `johansson`, `developer`, `front-end`, `front end`]}
      description=""
    />
    <Landing />
  </Layout>
)

export default IndexPage
