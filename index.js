var id, target, options;

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

target = {
  latitude: 0,
  longitude: 0,
};

id = navigator.geolocation.watchPosition(success, error, options);

function success(pos) {
  var crd = pos.coords;
  console.log(crd);

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log("Congratulations, you reached the target");
    navigator.geolocation.clearWatch(id);
  }

  var container = L.DomUtil.get("mapid");
  if (container != null) {
    container._leaflet_id = null;
  }

  var map = L.map("mapid").setView(
    [`${crd.latitude}`, `${crd.longitude}`],
    `${crd.accuracy}`
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([`${crd.latitude}`, `${crd.longitude}`])
    .addTo(map)
    .bindPopup("You're here!")
    .openPopup();
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}
