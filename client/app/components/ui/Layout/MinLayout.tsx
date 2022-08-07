import { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

const MinLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="main">
        {children}
      </div>
    </div>
  )
}

export default MinLayout;