import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TwoWayAuthGenerate from '../components/TwoWayAuthGenerate'

const SecondPage = () => (
  <Layout>
    <SEO
      title="Generate Two-Factor Authentication"
      description="Generate two-factor authentication"
    />
    <TwoWayAuthGenerate />
  </Layout>
)

export default SecondPage
