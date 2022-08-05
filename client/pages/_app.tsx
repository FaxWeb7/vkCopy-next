import { createContext } from 'react'
import { State } from '@/models/State';
import type { AppProps } from 'next/app'
import Store from '@/store/store';
import MainHead from 'meta/MainHead';
import '../app/styles/global.scss'

const store = new Store();
export const Context = createContext<State>({store})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context.Provider value={{store}}>
      <MainHead />
      <div className="wrapper">
        <div className="header">
        
        </div>
        <div className="main">
          <Component {...pageProps} />
        </div>
      </div>
    </Context.Provider>
  )
}

export default MyApp
