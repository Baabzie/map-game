import React from 'react';
import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { getMyLocation } from '@/hooks/getMyLocation';
import { locationCorrect } from '@/hooks/locationCorrect';
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
  const [correctUserLocation, setCorrectUserLocation] = useState<Location>({ latitude: null, longitude: null });
  const [locationActive, setLocationActive] = useState<Boolean>(false);
  const [questionLocation, setQuestionLocation] = useState<QuestionLocation>({ latitude: null, longitude: null, questionSwe: null });
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    let activeQuestion = JSON.parse(localStorage.getItem("activeQuestion")!);
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
      setQuestionLocation(randomLocation);
      setLocationActive(true);

      let activeQuestion = randomLocation
      localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
    }
  },[userLocation])

  useEffect(() => {
    if (locationCorrect(correctUserLocation, questionLocation)) {
      let activeQuestion = null;
      localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
      setLocationActive(false);
      setCorrect(true);
    }
    else if (!locationCorrect(correctUserLocation, questionLocation)) {
      setCorrect(false);
    }
    else {
    }
  },[correctUserLocation])

  const eraseActiveQuestion = () => {
      let activeQuestion = null;
      localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
      setLocationActive(false);
      setCorrect(null);
  }
  
  const handleGetLocation = () => {
    getMyLocation(setUserLocation);
  };

  const handleCorrectLocation = () => {
    getMyLocation(setCorrectUserLocation);
  }

  return (
    <Layout>
      <Component {...pageProps} />
      {locationActive ? (
        <>
          <Question questionLocation={questionLocation} />
          <button onClick={() => {handleCorrectLocation()}}>Titta om du hamnat rätt!</button>
          <button onClick={() => {eraseActiveQuestion()}}>Ny fråga</button>
          {correct === true ? <p>Rätt!</p> : correct === false ? <p>Fel!</p> : null}
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
