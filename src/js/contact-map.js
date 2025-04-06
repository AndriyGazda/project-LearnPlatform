import L from 'leaflet';

document.addEventListener('DOMContentLoaded', function () {
  const initialCoords = [49.8437, 24.0264]; // Львів

  const map = L.map('map').setView(initialCoords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(initialCoords).addTo(map).bindPopup("We're here!").openPopup();

  map.on('click', function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  });
});
