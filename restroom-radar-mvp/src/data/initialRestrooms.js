export const initialRestrooms = [
  {
    id: 1,
    name: "Bryant Park Restroom",
    address: "42nd St & 6th Ave, New York, NY 10018",
    latitude: 40.7536,
    longitude: -73.9832,
    cleanliness: 4,
    status: "Open",
    accessible: true,
    genderNeutral: false,
    accessCode: "#2468",
    timestamp: new Date('2025-10-01').toISOString()
  },
  {
    id: 2,
    name: "Madison Square Park Restroom",
    address: "Madison Ave & E 23rd St, New York, NY 10010",
    latitude: 40.7420,
    longitude: -73.9881,
    cleanliness: 3,
    status: "Open",
    accessible: false,
    genderNeutral: true,
    timestamp: new Date('2025-10-02').toISOString()
  },
  {
    id: 3,
    name: "Washington Square Park Restroom",
    address: "Washington Square, New York, NY 10012",
    latitude: 40.7308,
    longitude: -73.9973,
    cleanliness: 5,
    status: "Open",
    accessible: true,
    genderNeutral: true,
    timestamp: new Date('2025-10-03').toISOString()
  },
  {
    id: 4,
    name: "Central Park Bethesda Terrace",
    address: "Bethesda Terrace, Central Park, New York, NY 10024",
    latitude: 40.7739,
    longitude: -73.9718,
    cleanliness: 4,
    status: "Open",
    accessible: true,
    genderNeutral: false,
    timestamp: new Date('2025-10-04').toISOString()
  }
];