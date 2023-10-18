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
    questionSwe: "Gunnarsons Specialkonditori",
    latitude: 59.31006212870785,
    longitude: 18.075216544332868
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

function findClosestLocation(userLocation: { latitude: number | null; longitude: number | null } | null, jsonData: LocationData[]): LocationData | null {
  if (!userLocation) {
    return null;
  }

  let closestLocation: LocationData | null = null;
  let closestDistance = Number.MAX_VALUE;

  for (const location of jsonData) {
    const distance = calculateDistance(userLocation.latitude || 0, userLocation.longitude || 0, location.latitude, location.longitude);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLocation = location;
    }
  }

  return closestLocation;
}

function Question(props: QuestionProps) {
  const closestLocation = findClosestLocation(props.userLocation, jsonData);

  return (
    <div>
      {closestLocation ? (
        <div className='question-div'>
          <p>Go to:</p>
          <p>{closestLocation.questionSwe}</p>
        </div>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
}

export default Question;