import { CITIES } from '../data/metroData';

export function buildGraph(cityId) {
  const city = CITIES[cityId];
  if (!city) return {};
  const graph = {};
  city.stations.forEach(s => { graph[s.id] = []; });
  city.connections.forEach(([a, b]) => {
    if (graph[a]) graph[a].push(b);
    if (graph[b]) graph[b].push(a);
  });
  return graph;
}

export function findRoute(cityId, sourceId, destId) {
  if (sourceId === destId) return { path: [sourceId], interchanges: [] };
  const graph = buildGraph(cityId);
  const city = CITIES[cityId];
  const stationMap = {};
  city.stations.forEach(s => { stationMap[s.id] = s; });

  // BFS
  const queue = [[sourceId]];
  const visited = new Set([sourceId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        if (neighbor === destId) {
          // Detect interchanges
          const interchanges = [];
          for (let i = 1; i < newPath.length - 1; i++) {
            const prev = stationMap[newPath[i - 1]];
            const curr = stationMap[newPath[i]];
            const next = stationMap[newPath[i + 1]];
            
            // Check if we are switching lines at 'curr'
            // A station is an interchange if it's on multiple lines.
            // We detect it if the line connecting (prev, curr) is different from (curr, next).
            // In this data model, we check if the next station's primary line is different from the current one.
            if (curr.line !== next.line) {
              interchanges.push(curr.id);
            }
          }
          return { path: newPath, interchanges };
        }
        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }
  return null; // No path
}

export function getRouteDetails(cityId, path) {
  const city = CITIES[cityId];
  if (!city || !path) return null;
  const stationMap = {};
  city.stations.forEach(s => { stationMap[s.id] = s; });
  return path.map(id => stationMap[id]).filter(Boolean);
}