import { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">
          <NavBar />
          <div className="main">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;