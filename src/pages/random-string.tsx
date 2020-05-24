import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import RandomString from '../components/RandomString'

const SecondPage = () => (
  <Layout>
    <SEO
      title="Random String"
      description="Genrates a random string"
    />
    <RandomString />
  </Layout>
)

export default SecondPage
