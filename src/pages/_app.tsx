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
  const [message, setMessage] = useState("Tryck på knappen ovan för att börja!");


  // On page render

  useEffect(() => {
    let activeQuestion = JSON.parse(localStorage.getItem("activeQuestion")!);
    if (activeQuestion) {
      setQuestionLocation(activeQuestion);
      setLocationActive(true);
      setMessage("Tryck på knappen för att se om du är på rätt plats");
    }
  }, [])

  const eraseActiveQuestion = () => {
    let activeQuestion = null;
    localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
    setLocationActive(false);
    setMessage("Tryck på knappen för en ny fråga!");
  }

  // On start of game
  
  const handleGetLocation = async () => {
    await getMyLocation(setUserLocation);
  };

  useEffect(() => {
    const locationsWithinRange = getLocationsWithinRange(userLocation, jsonData);
    const randomIndex = Math.floor(Math.random() * locationsWithinRange.length);

    if (locationsWithinRange.length > 0) {
      const randomLocation = locationsWithinRange[randomIndex];
      setQuestionLocation(randomLocation);
      setLocationActive(true);

      let activeQuestion = randomLocation
      localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
      setMessage("Tryck på knappen för att se om du är på rätt plats");
    }
  },[userLocation])

  // On correction of question
  
  const handleCorrectLocation = async () => {
    await getMyLocation(setCorrectUserLocation);
  }

  useEffect(() => {
    if (correctUserLocation.latitude !== null || correctUserLocation.longitude !== null) { // Add this condition
      if (locationCorrect(correctUserLocation, questionLocation)) {
        let activeQuestion = null;
        localStorage.setItem("activeQuestion", JSON.stringify(activeQuestion));
        setLocationActive(false);
        setMessage("Rätt! Tryck på knappen för att få en ny plats!");
      } else if (!locationCorrect(correctUserLocation, questionLocation)) {
        console.log(correctUserLocation);
        setMessage("Fel! Tryck på knappen för att testa igen!");
      }
    }
  }, [correctUserLocation]);
  
  return (
    <Layout>
      <Component {...pageProps} />
      {locationActive ? (
        <>
          <Question questionLocation={questionLocation} handleCorrectLocation={handleCorrectLocation} eraseActiveQuestion={eraseActiveQuestion} />
        </>
      ) : (
        <>
          <button onClick={() => {handleGetLocation()}}>Ge mig en position</button>
        </>
      )}
      <p>{message}</p>
    </Layout>
  );
}

export default App;
