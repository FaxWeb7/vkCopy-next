import { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <nav className='nav'>
        <NavBar />
      </nav>
      <div className="main">
        {children}
      </div>
    </div>
  )
}

export default Layout;