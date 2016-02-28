

var map = L.map('map');
// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
// }).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'tbor.n138miod',
    accessToken: 'pk.eyJ1IjoidGJvciIsImEiOiJmZThlMTE1YzQ5MDZiNWIyNDk1NTg5OGNjZWNmMGIyNCJ9.KBafeg5js_TsFV0QWoygpg'
}).addTo(map);

for (var name = names.length - 1; name >= 0; name--) {
	new L.GPX(names[name], {async: true}).on('loaded', function(e) {
	  map.fitBounds(e.target.getBounds());
	}).addTo(map);
}