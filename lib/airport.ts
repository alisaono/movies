export const AIRPORTS: Record<string, { name: string; lat: number; lon: number; tz: string }> = {
  SFO: { name: "San Francisco International", lat: 37.6213, lon: -122.3790, tz: "America/Los_Angeles" },
  LAX: { name: "Los Angeles International", lat: 33.9416, lon: -118.4085, tz: "America/Los_Angeles" },
  SEA: { name: "Seattle–Tacoma International", lat: 47.4502, lon: -122.3088, tz: "America/Los_Angeles" },
  JFK: { name: "John F. Kennedy International", lat: 40.6413, lon: -73.7781, tz: "America/New_York" },
  EWR: { name: "Newark Liberty International", lat: 40.6895, lon: -74.1745, tz: "America/New_York" },
  ORD: { name: "Chicago O'Hare International", lat: 41.9742, lon: -87.9073, tz: "America/Chicago" },
  DFW: { name: "Dallas/Fort Worth International", lat: 32.8998, lon: -97.0403, tz: "America/Chicago" },
  ATL: { name: "Hartsfield–Jackson Atlanta International", lat: 33.6407, lon: -84.4277, tz: "America/New_York" },
  BOS: { name: "Boston Logan International", lat: 42.3656, lon: -71.0096, tz: "America/New_York" },
  MIA: { name: "Miami International", lat: 25.7959, lon: -80.2870, tz: "America/New_York" },
  DEN: { name: "Denver International", lat: 39.8561, lon: -104.6737, tz: "America/Denver" },
  IAD: { name: "Washington Dulles International", lat: 38.9531, lon: -77.4565, tz: "America/New_York" },
};
