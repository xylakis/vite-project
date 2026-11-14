// ─────────────────────────────────────────────────────────────
// WALKING ROUTE: the points the route must pass through, in order.
// The first point is the start, the last one the finish.
//
// The app does NOT ask a routing server while running. It draws
// the saved route in src/route.json. After changing these points,
// run:   npm run update-route
// (needs internet; it asks routing.openstreetmap.de once and
// rewrites src/route.json). Then check the route on the map.
// ─────────────────────────────────────────────────────────────

const routeStops = [
  { lat: 35.51833824463729, lng: 24.038573001776236, label: "Start" },
  { lat: 35.51905649097498, lng: 24.038519357623727, label: "Waypoint 1" },
  { lat: 35.51990558269885, lng: 24.038551098620385, label: "Waypoint 2" },
  { lat: 35.51823, lng: 24.03572, label: "Waypoint 3" },
  { lat: 35.51826183507514, lng: 24.037639593084897, label: "Waypoint 4" },
  { lat: 35.51786, lng: 24.03875, label: "Waypoint 5" },
  { lat: 35.51761632277899, lng: 24.038720364663188, label: "Waypoint 6" },
  { lat: 35.5169038293579, lng: 24.040015207732438, label: "Waypoint 7" },
  { lat: 35.51631566487464, lng: 24.038841207387353, label: "Waypoint 8" },
  { lat: 35.51595288410136, lng: 24.038748273570516, label: "Waypoint 9" },
  { lat: 35.51554070140421, lng: 24.03886396664548, label: "Waypoint 10" },
  { lat: 35.515810858833554, lng: 24.038702754967662, label: "Waypoint 11" },
  { lat: 35.51574373598675, lng: 24.03864634745825, label: "Waypoint 12" },
  { lat: 35.51516081950533, lng: 24.03821451185436, label: "Waypoint 13" },
  { lat: 35.51528962913435, lng: 24.03777731177107, label: "Waypoint 14" },
  { lat: 35.517492460061014, lng: 24.037694163312853, label: "Finish" },
];

export default routeStops;
