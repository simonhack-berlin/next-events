import Head from 'next/head'
import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import { NotificationContextProvider } from '@/store/notification-context'

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
          <Head>
            <title>Next Events</title>
            <meta name="description" content="find a lot of great events" />
            <meta name="viewport" content="width=device-width, initial-scale=0.5" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
  )
}
