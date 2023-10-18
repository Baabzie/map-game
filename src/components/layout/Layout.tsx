// import Header from "./Header"

// export default function Layout(props) {
//     return (
//         <>
//             <Header/>
//             <main>{props.children}</main>
//         </>
//     )
// }

import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;