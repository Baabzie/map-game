import React from 'react';
import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { getMyLocation } from '@/hooks/getMyLocation';
import { getLocationsWithinRange } from '@/hooks/getLocationsWithinRange';
import { jsonData } from '@/data/jsonData';
import Question from '@/components/question/Question';

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

interface Location {
  latitude: number | null;
  longitude: number | null;
}

interface QuestionLocation {
  latitude: number | null;
  longitude: number | null;
  questionSwe: string | null;
}


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [userLocation, setUserLocation] = useState<Location>({ latitude: null, longitude: null });
  const [locationActive, setLocationActive] = useState<Boolean>(false);
  const [questionLocation, setQuestionLocation] = useState<QuestionLocation>({ latitude: null, longitude: null, questionSwe: null });

  useEffect(() => {
    let activeQuestion = JSON.parse(localStorage.getItem("activeQuestion")!);
    console.log(activeQuestion);
    if (activeQuestion) {
      setQuestionLocation(activeQuestion);
      setLocationActive(true);
    }
  }, [])

  useEffect(() => {
    const locationsWithinRange = getLocationsWithinRange(userLocation, jsonData);
    const randomIndex = Math.floor(Math.random() * locationsWithinRange.length);

    if (locationsWithinRange.length > 0) {
      const randomLocation = locationsWithinRange[randomIndex];
      console.log(randomLocation);
      setQuestionLocation(randomLocation);
      setLocationActive(true);

      let activeQuestion = randomLocation
      localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
    }
  },[userLocation])
  

  // Use the imported getMyLocation function
  const handleGetLocation = () => {
    getMyLocation(setUserLocation);
  };

  return (
    <Layout>
      <Component {...pageProps} />
      {locationActive ? (
        <>
          <Question questionLocation={questionLocation} />
          <button>Titta om du hamnat rätt!</button>
        </>
      ) : (
        <>
          <button onClick={() => {handleGetLocation()}}>Ge mig en position</button>
          <p>Tryck på knappen ovan för att börja!</p>
        </>
      )}
    </Layout>
  );
}

export default App;
