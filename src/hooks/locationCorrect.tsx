import { calculateDistance } from "./calculateDistance";


export function locationCorrect(userLocation: { latitude: number | null; longitude: number | null } | null, questionLocation: { latitude: number | null; longitude: number | null; questionSwe: string | null; }) {

    if (userLocation && userLocation.longitude !== null && userLocation.latitude !== null && questionLocation.longitude !== null && questionLocation.latitude !== null) {

        const distance = calculateDistance(userLocation.latitude || 0, userLocation.longitude || 0, questionLocation.latitude, questionLocation.longitude) * 1000;
      
          // Check if the location is within (in meters)
          if (distance >= 0 && distance <= 30) {
            return true;
          }
        }
    }
