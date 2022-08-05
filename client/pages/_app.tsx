import { createContext } from 'react'
import { State } from '@/models/State';
import type { AppProps } from 'next/app'

import Store from '@/store/store';

const store = new Store();
export const Context = createContext<State>({store})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context.Provider value={{store}}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default MyApp
