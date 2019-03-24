// Adds current date
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("todaysdate").innerHTML = m + "/" + d + "/" + y;
//---------------------------------------------------------------------------------------------------------------------------------

// SOURCE : https://leafletjs.com/examples/layers-control/
// ===========================================================================================================================
// *** STEP 3 *****************: Grab the dataset : using 30 day data for all earthquakes 
var linkgeo = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
//"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// a: Create binding to jso file
d3.json(linkgeo, function(response) {
  //console.log(response.features);
  
  // holds all circle markers
  var listlayer = [];
  // b: looped through our data and into the tree into geometry which contains the "coordinates"
  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i];
    //console.log(location); 
    //console.log([location.geometry.coordinates[1],location.geometry.coordinates[0]]);
    
    // lat          , lon           , mag
    //35.7331667[1], -118.4271667[0], 1[2]]

    // if MAG 0-2 pull the lat and lon points, append to green circle "marker", add to list and append text w mag.
    if (location.properties.mag < 2.0) {
      listlayer.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        color: 'green',
        fillColor: '#2AC624',
        fillOpacity: .25,
        radius: 20000
      }).bindPopup("Magnitude:" + location.properties.mag));
      //console.log(location);
    }
    // if MAG 2-4 pull the lat and lon points, append to yellow circle "marker", add to list and append text w mag.
    else if (location.properties.mag > 2.01 && location.properties.mag < 4.0) {
      listlayer.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        color: '#EBF30B',
        fillColor: '#EBF30B',
        fillOpacity: .25,
        radius: 50000
      }).bindPopup("Magnitude:" + location.properties.mag));
    }
    // if MAG 4-6 pull the lat and lon points, append to mustard circle "marker", add to list and append text w mag.
    else if (location.properties.mag > 4.01 && location.properties.mag < 6.0) {
      listlayer.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        color: '#F3CC0B',
        fillColor: '#F3CC0B',
        fillOpacity: .25,
        radius: 70000
      }).bindPopup("Magnitude:" + location.properties.mag));
    }
    // if MAG 6-8 pull the lat and lon points, append to orange circle "marker", add to list and append text w mag.
    else if (location.properties.mag > 6.01 && location.properties.mag < 8.0) {
      listlayer.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        color: '#F3700B',
        fillColor: 'white',
        fillOpacity: .5,
        radius: 90000
      }).bindPopup("Magnitude:" + location.properties.mag));
    }
    // if MAG 8+ pull the lat and lon points, append to red circle "marker", add to list and append text w mag.
    else if (location.properties.mag > 8.01) {
      listlayer.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        color: '#F3220B',
        fillColor: 'red',
        fillOpacity: .5,
        radius: 100000
      }).bindPopup("Magnitude:" + location.properties.mag));
    }
    else {
      ;
    }
  };

  // Using https://github.com/fraxen/tectonicplates
  var linkbound = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
  
  // a: Create binding to jso file
  d3.json(linkbound, function(boundata) {

    // will be used as overlayMap for tetonic plate boundaries
    var scndlayer = [];

    //console.log(boundata.features[0].geometry.coordinates);
    // get into tree and grab the path to coordinates store in each array 
    for (var b = 0; b < boundata.features.length; b++) {
      var coordsArry = boundata.features[b].geometry.coordinates;
      //console.log(coordsArry);

      // for each object ([lat,lng]) in all arrays 
      for (var e = 0; e < coordsArry.length; e++) {
        // grab all of all
        var polyarrys = coordsArry[e];
        //console.log(polyarrys);
        //console.log(polyarrys[0]);
        //console.log(polyarrys[1]);

        // push to polygon
        scndlayer.push(L.polygon([ 
          [polyarrys[1], polyarrys[0]]
          ], {
          color: 'brown',
          weight: 5.5,
          opacity: 0.75
        }));

      };
      
    };


// CONTROLS & SETTINGS
// ===============================================================================================================
  // **** STEP 4 *****************: Create Layer Group for all our points pushed to listlayer
  var earthkes = new L.layerGroup(listlayer);
  var pltbounds = new L.layerGroup(scndlayer);

  // * STEP 1 ***************** : Add a tile layer(s) (the background map image) to our map
  // We use the addTo method to add objects to our map
  var satel = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var strets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // ***** STEP 5 *****************: Create Layers Control:
  // (1) base layers that are mutually exclusive (visible one at a time)
  var baseLayers = {
    Satellite: satel,
    Streets: strets  
  };

  // ****** STEP 6 *****************: Create OverlayMap(s)
  // (2) can be toggle on or off
  var overlayMaps = {
    "Earthquakes": earthkes,
    "Plate Boundaries": pltbounds
  };

  // ** STEP 2 ***************** : Create our initial map object
  // Set the latlng, and the starting zoom level
  var myMap = L.map("map", {
    center: [10.500000, -66.916664],
    // change value ==  zooms out < x < zooms in
    zoom: 3.4,
    // set the default baseLayer, and OverlayMap
    layers: [strets, earthkes, pltbounds]
  });

  // ******* STEP 7 ***************** : Set the control / Activate "myMap"
  L.control.layers(baseLayers, overlayMaps).addTo(myMap);





  // ...........................................
  // CUSTOMAZATIONS: Creating legend control:
  var legend = L.control({position: 'topright'});
  legend.onAdd = function (myMap) {
      var div = L.DomUtil.create('div', 'info legend')
      var limits = [0,1,2,3,4]
      var colors = ["#2AC624","#EBF30B","#F3CC0B","#F3700B","#F60E15"]
      var labels = [" 0 - 2 "," 2 - 4 "," 4 - 6 "," 6 - 8 "," 8 + "];
      var legenddisplay = [];
      // Add min & max
      
      limits.forEach(function(limit, index) {
          legenddisplay.push("<li style=\"list-style-type:none;background-color:" 
          + colors[index] + "\">" + "<h6>" + labels[index] +"</h6></li>");
        });
      div.innerHTML += "<ul>" + legenddisplay.join("") + "</ul>" ;
      return div;  
      };    
  legend.addTo(myMap); 


  });

});


  
 
