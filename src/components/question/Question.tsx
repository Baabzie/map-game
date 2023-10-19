import React from 'react';

// Define the structure of your location data
interface LocationData {
  questionSwe: string;
  longitude: number;
  latitude: number;
}

// Define the prop type for the Question component
interface QuestionProps {
  userLocation: { latitude: number | null; longitude: number | null } | null;
}

const jsonData: LocationData[] = [
  {
    questionSwe: "Nackas Hörna",
    latitude: 59.31129173009845,
    longitude: 18.08001291554731
  },
  {
    questionSwe: "Globen",
    latitude: 59.29367385346533,
    longitude: 18.083496455658846
  },
  {
    questionSwe: "Södersjukhuset",
    latitude: 59.30993246128399,
    longitude: 18.055870424815247
  },
  {
    questionSwe: "Värmdö gymnasium",
    latitude: 59.299573847468494,
    longitude: 18.076899228039238
  },
  {
    questionSwe: "Ringen",
    latitude: 59.30863938774631,
    longitude: 18.07577284253091
  },
  {
    questionSwe: "Allhelgonakyrkan",
    latitude: 59.3098901485267,
    longitude: 18.07064490325645
  },
  {
    questionSwe: "Åsö vuxengymnasium",
    latitude: 59.311521237061235,
    longitude: 18.074291302508367
  },
  {
    questionSwe: "Skrapan",
    latitude: 59.31213017098195,
    longitude: 18.073909564691057
  },
  {
    questionSwe: "Göta Lejon",
    latitude: 59.31360742628512,
    longitude: 18.073916644956448
  },
  {
    questionSwe: "Sofia kyrka",
    latitude: 59.31250129852528,
    longitude: 18.088798678690033
  },
  {
    questionSwe: "Eriksdalsbadet",
    latitude: 59.30510635605385,
    longitude: 18.07520797636408
  },
  {
    questionSwe: "Högalidskyrkan",
    latitude: 59.3178066330842,
    longitude: 18.0377022869954
  },
  {
    questionSwe: "Café Eurobar",
    latitude: 59.309934187783654,
    longitude: 18.078978881612034
  },
  {
    questionSwe: "Adolf Fredriks kyrka",
    latitude: 59.337903803257355,
    longitude: 18.060059393093184
  },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1Rad = (Math.PI * lat1) / 180;
  const lat2Rad = (Math.PI * lat2) / 180;
  const deltaLat = (Math.PI * (lat2 - lat1)) / 180;
  const deltaLon = (Math.PI * (lon2 - lon1)) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

function getLocationsWithinRange(userLocation: { latitude: number | null; longitude: number | null } | null, jsonData: LocationData[]): LocationData[] {
  if (!userLocation) {
    return [];
  }

  // Create a new array to store locations within the specified range
  const locationsWithinRange: LocationData[] = [];

  for (const location of jsonData) {
    const distance = calculateDistance(userLocation.latitude || 0, userLocation.longitude || 0, location.latitude, location.longitude) * 1000;
    console.log(distance)

    // Check if the location is within 1-2 kilometers
    if (distance >= 1000 && distance <= 2000) {
      locationsWithinRange.push(location);
    }
  }

  return locationsWithinRange;
}

function Question(props: QuestionProps) {
  const locationsWithinRange = getLocationsWithinRange(props.userLocation, jsonData);

  return (
    <div>
      <div className='question-div'>
      {locationsWithinRange.length > 0 ? (
        <>
          <p>Locations Within 1-2 km:</p>
          <ul>
            {locationsWithinRange.map((location, index) => (
              <li key={index}>{location.questionSwe}</li>
              ))}
          </ul>
        </>
      ) : (
        <p>No locations found within the specified range.</p>
      )}
        </div>
    </div>
  );
}

export default Question;