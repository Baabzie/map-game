export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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