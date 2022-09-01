import Layout from '@/components/Layout'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'
import ClientItem from '@/components/rsc/ClientItem.client'
import ServerItem from '@/components/rsc/ServerItem.server'

const HooksPage = () => {
  return (
    <Layout>
      <Content>
        <Header />
        <Section size="large">
          <h1 className="sr-only">React Server Components</h1>
          <div>
            Client component:
            <ClientItem />
          </div>
          <div>
            Server component:
            <ServerItem />
          </div>
        </Section>
      </Content>
    </Layout>
  )
}

export default HooksPage
