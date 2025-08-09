import { AIRPORTS } from "./airport";

const haversineKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const estimateBlockMinutes = (distanceKm: number): number => {
  // Simple model:
  // - Choose cruise speed by distance bucket
  // - Add fixed buffers for taxi/climb/approach based on bucket
  // - Add 8% contingency (winds, routing)
  let cruiseKmh: number;
  let bufferMin: number;

  if (distanceKm < 500) {
    // short hop (regional jet / turboprop-ish)
    cruiseKmh = 650; // typical regional jet
    bufferMin = 20;
  } else if (distanceKm < 2500) {
    // short/medium haul (A320/737)
    cruiseKmh = 830; // typical narrow-body cruise
    bufferMin = 25;
  } else if (distanceKm < 6000) {
    // long-ish transcon/transatlantic
    cruiseKmh = 880; // typical wide-body cruise
    bufferMin = 30;
  } else {
    // ultra long haul
    cruiseKmh = 905; // near long-haul cruise
    bufferMin = 35;
  }

  const airMinutes = (distanceKm / cruiseKmh) * 60;
  const padded = (airMinutes + bufferMin) * 1.08; // +8% contingency
  return Math.round(padded);
}

export const estimateFlightTime = (origin: string, destination: string) => {
  const o = AIRPORTS[origin];
  const d = AIRPORTS[destination];
  if (!o) {
    console.error(`Unknown origin airport: ${origin}`);
    return;
  }
  if (!d) {
    console.error(`Unknown destination airport: ${destination}`);
    return;
  }
  if (o && d && o === d) {
    console.error("Origin and destination cannot be the same.");
    return;
  }
  const distanceKm = haversineKm(o.lat, o.lon, d.lat, d.lon);
  return estimateBlockMinutes(distanceKm);
}
