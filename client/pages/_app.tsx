import { createContext } from 'react'
import type { AppProps } from 'next/app'
import Store from '@/store/store';
import MainHead from 'meta/MainHead';
import '../app/styles/global.scss'
import Layout from '@/components/ui/Layout/Layout';
import MinLayout from '@/components/ui/Layout/MinLayout';

const store = new Store();
export const Context = createContext<{store: Store}>({store})

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (pageProps.withoutNav === true) {
    return (
      <Context.Provider value={{store}}>
        <MainHead />
        <MinLayout>
          <Component {...pageProps} />
        </MinLayout>
      </Context.Provider>
    )
  }
  return (
    <Context.Provider value={{store}}>
      <MainHead />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  )
  // if (store.withoutNav){
  //   
  // }
}

export default MyApp
