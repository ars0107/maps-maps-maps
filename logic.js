`The following program should visualize earthquake data from all quakes recorded in the last day using leaflet`

// Creating a map object
var myMap = L.map('quakeMap').setView([37.09, -95.71], 2); // this is for London, will need another location

// Adding a layer to the map using Mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiYXJzMDEwNyIsImEiOiJjamFzbXoxeXY0dXdvMndwbDR1dWdnaGd5In0.T8N_gfaR8byS5LWCr5K3jQ'
}).addTo(myMap);

// query url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// putting the colors and magnitudes into a bin
function getColor(d) {
    return d > 6  ? 'rgb(245, 182, 8)' :
           d > 5  ? 'rgb(8, 245, 134)' :
           d > 4  ? 'rgb(245, 8, 245)' :
           d > 3  ? 'rgb(129, 64, 233)' :
           d > 2  ? 'rgb(1, 82, 255)' :
           d > 1  ? 'rgb(101, 188, 241)' :
                    '#FFEDA0';        
}

// pulling the geojson data 
d3.json(url, function(data) {
    L.geoJson(data, {
        // adding a map layer
        pointToLayer: function(feature, latlng) {
            // creating a circle marker
            return L.circleMarker(latlng, {
                // styling circle marker 
                radius: feature.properties.mag * 2, /* this selects the size of the circle based on magnitude */
                fillColor: getColor(feature.properties.mag), /* this selects a color based on magnitude */ 
                color: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup("<h3>Quake Info</h3>" + "<p>Location: " + feature.properties.place + "</p><p>Magnitude: " + feature.properties.mag + "</p>");
            // adding a popup when the user clicks a circle
            
        }
    // adding the layer to the map
    }).addTo(myMap);
});

// add legend
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function(map) {
    // create a div for the element and assign the grades
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5, 6];
        // add a title to the Legend for clarity
        div.innerHTML = '<h3>Magnitude</h3>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '; color:' + getColor(grades[i]) +  ';">....</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '++');
    }
    return div;
};

legend.addTo(myMap);
