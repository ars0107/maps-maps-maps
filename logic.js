`The following program should visualize earthquake data from all quakes recorded in the last day using leaflet`

// Creating a map object
var myMap = L.map('quakeMap').setView([37.09, -95.71], 2); // this is for London, will need another location

// Adding a layer to the map using Mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiYXJzMDEwNyIsImEiOiJjamFzbXoxeXY0dXdvMndwbDR1dWdnaGd5In0.T8N_gfaR8byS5LWCr5K3jQ'
}).addTo(myMap);

// query url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(data) {
    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "white",
            };
            layer.bindPopup("<h1>"+ feature.properties.title + "</h1>");
        }
    }).addTo(myMap);
});

// add legend

