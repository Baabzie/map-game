export function getMyLocation(setLocation: Function): Promise<void> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(location);
          resolve();
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      reject(new Error("Geolocation is not available in this browser."));
    }
  });
}