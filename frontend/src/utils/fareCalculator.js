export function calculateFare(numStations) {
  if (numStations <= 0) return 0;
  if (numStations <= 2) return 10;
  if (numStations <= 5) return 20;
  if (numStations <= 10) return 30;
  if (numStations <= 15) return 40;
  return 50;
}

export function estimateTravelTime(numStations) {
  // ~2.5 min per station + 1 min buffer per station
  const minutes = numStations * 3;
  if (minutes < 60) return `${minutes} mins`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

export function generateBookingId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MTR-${ts}-${rand}`;
}