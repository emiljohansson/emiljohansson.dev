import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ProgressBar from '../components/ProgressBar'

const SecondPage = () => (
  <Layout>
    <SEO
      title="Progress Bar"
      description="Progress bar"
    />
    <ProgressBar />
  </Layout>
)

export default SecondPage
