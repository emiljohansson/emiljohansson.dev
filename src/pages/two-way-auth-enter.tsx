import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TwoWayAuthEnter from '../components/TwoWayAuthEnter'

const SecondPage = () => (
  <Layout>
    <SEO
      title="Enter Two-Factor Authentication"
      description="Enter two-factor authentication"
    />
    <TwoWayAuthEnter />
  </Layout>
)

export default SecondPage
