// import '@/styles/globals.css'
// import Layout from '@/components/layout/Layout'

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </>
//     )
// }

import React from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { useGeolocation } from '@/hooks/useGeolocation';
import Question from '@/components/question/Question';

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const userLocation = useGeolocation();


  //Test variables
  const home = {latitude: 59.30992626125095, longitude: 18.074115296829312}
  const oldHome = {latitude: 59.31505460967073, longitude: 18.08529895002025}

  return (
    <Layout>
      <Component {...pageProps} />
      {userLocation && (
        <>
          <Question userLocation={userLocation} />
        </>
      )}
    </Layout>
  );
}

export default App;
