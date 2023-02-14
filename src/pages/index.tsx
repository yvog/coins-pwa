import { AuthDrawer, CoinTable, Header, Layout } from '@/components'

export default function Home() {
  return (
    <Layout header={<Header />}>
      <CoinTable />
      <AuthDrawer />
    </Layout>
  )
}
