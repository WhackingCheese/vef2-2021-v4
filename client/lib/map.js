import L from 'leaflet';

let map;
let markers = [];

export function createPopup(geojson, content) {
  const marker = L.geoJSON(geojson).addTo(map).bindPopup(content);
  markers.push(marker);
  return marker;
}

export function clearMarkers() {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = [];
}

export function init(el) {
  const options = {
    center: [0, 0],
    zoom: 2,
  };

  map = L.map(el, options);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
}
