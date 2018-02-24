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


// selecting a list of colors to assign to different magnitudes
var colors = ["rgb(101, 188, 241)", "rgb(1, 82, 255)", "rgb(129, 64, 233)", "rgb(245, 8, 245)", "rgb(8, 245, 134)", "rgb(245, 182, 8)"]

// putting the colors and magnitudes into a bin
function magColor(magnitude) {
    if (magnitude <= 1) {
        return colors[0];
    } else if (magnitude > 1 && magnitude < 2) {
        return colors[1];
    } else if (magnitude > 2 && magnitude < 3) {
        return colors[2];
    } else if (magnitude > 3 && magnitude < 4) {
        return colors[3];
    } else if (magnitude > 4 && magnitude < 5) {
        return colors[4];
    } else {
        return colors[5];
    }
};

// pulling the geojson data 
d3.json(url, function(data) {
    L.geoJson(data, {
        // adding a map layer
        pointToLayer: function(feature, latlng) {
            // creating a circle marker
            return L.circleMarker(latlng, {
                // styling circle marker 
                radius: feature.properties.mag * 2, /* this selects the size of the circle based on magnitude */
                fillColor: magColor(feature.properties.mag), /* this selects a color based on magnitude */ 
                color: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
            // adding a popup when the user clicks a circle
            marker.bindPopup(feature.properties.mag).openPopup();
        }
    // adding the layer to the map
    }).addTo(myMap);
});

// add legend

