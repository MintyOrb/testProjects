

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
map.setView([37.7749, -95],4);
for (var name = names.length - 1; name >= 0; name--) {
	new L.GPX(names[name], {async: true}).on('loaded', function(e) {
	    console.log(e.target.getBounds());
        // map.fitBounds(e.target.getBounds()
	}).addTo(map);
}

// If you want to display additional information about the GPX track, you can do so in the 'loaded' event handler, calling one of the following methods on the GPX object e.target:

// get_name(): returns the name of the GPX track
// get_distance(): returns the total track distance, in meters
// get_start_time(): returns a Javascript Date object representing the starting time
// get_end_time(): returns a Javascript Date object representing when the last point was recorded
// get_moving_time(): returns the moving time, in milliseconds
// get_total_time(): returns the total track time, in milliseconds
// get_moving_pace(): returns the average moving pace in milliseconds per km
// get_moving_speed(): returns the average moving speed in km per hour
// get_total_speed(): returns the average total speed in km per hour
// get_elevation_gain(): returns the cumulative elevation gain, in meters
// get_elevation_loss(): returns the cumulative elevation loss, in meters
// get_average_hr(): returns the average heart rate (if available)
// If you're not a fan of the metric system, you also have the following methods at your disposal:

// get_distance_imp(): returns the total track distance in miles
// get_moving_pace_imp(): returns the average moving pace in milliseconds per hour
// get_moving_speed_imp(): returns the average moving speed in miles per hour
// get_total_speed_imp(): returns the average total speed in miles per hour