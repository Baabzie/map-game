import { calculateDistance } from "./calculateDistance";

// Define the structure of your location data
interface LocationData {
    questionSwe: string;
    longitude: number;
    latitude: number;
  }

export function getLocationsWithinRange(userLocation: { latitude: number | null; longitude: number | null } | null, jsonData: LocationData[]): LocationData[] {
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