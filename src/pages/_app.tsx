import React from 'react';
import { useState } from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { getMyLocation } from '@/hooks/getMyLocation';
import Question from '@/components/question/Question';

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

interface Location {
  latitude: number | null;
  longitude: number | null;
}


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [userLocation, setUserLocation] = useState<Location>({ latitude: null, longitude: null });
  const [locationActive, setLocationActive] = useState<Boolean>(false);
  

    // Use the imported getMyLocation function
    const handleGetLocation = () => {
      getMyLocation(setUserLocation);
    };

  return (
    <Layout>
      <Component {...pageProps} />
      <button onClick={() => {handleGetLocation(), setLocationActive(true)}}>Ge mig en position</button>
      {locationActive ? (
        <>
          <Question userLocation={userLocation} />
        </>
      ) : (
        <>
          <p>Tryck på knappen ovan för att börja!</p>
        </>
      )}
    </Layout>
  );
}

export default App;
