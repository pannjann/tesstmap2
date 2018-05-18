if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken = 'pk.eyJ1IjoibGlrZWxvY2FsIiwiYSI6ImNqZmVqdWYwMzQ4ZnUycXBuNmc5emV1aDIifQ.HIN1_MaUjbFMfcd1hI2P1w';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
    center: [20.9561659, 52.2230421], // starting position [lng, lat]
    zoom: 9, // starting zoom
    attributionControl: false
});


function getRoute() {
  var road_1 = [20.9789653, 52.232324];
  var road_2 = [21.0054239,52.2495126];
  var road_3 = [21.0328105, 52.2151532];
  var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + road_1[0] + ',' + road_1[1] + ';' + road_2[0] + ',' + road_2[1] + ';' + road_3[0] + ',' + road_3[1] + '?geometries=geojson&access_token=' + mapboxgl.accessToken;
  $.ajax({
    method: 'GET',
    url: directionsRequest,
  }).done(function(data) {
    var route = data.routes[0].geometry;
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
          lineMetrics: true
        }
      },
      paint: {
        'line-width': 2,
         'line-color': '#ff0'
         // 'line-dasharray': [6,2]
      }
    });

    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "properties": {},
                "coordinates": [
                    road_1,
                    road_3,
                    road_2
                ]
            }
        }]
    };

    document.getElementById('zoomto').addEventListener('click', function() {

            // Geographic coordinates of the LineString
            var coordinates = geojson.features[0].geometry.coordinates;

            // Pass the first coordinates in the LineString to `lngLatBounds` &
            // wrap each coordinate pair in `extend` to include them in the bounds
            // result. A variation of this technique could be applied to zooming
            // to the bounds of multiple Points or Polygon geomteries - it just
            // requires wrapping all the coordinates with the extend method.
            var bounds = coordinates.reduce(function(bounds, coord) {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

            map.fitBounds(bounds, {
                padding: 20
            });
            });

  });
}

function getPoint() {

  map.addLayer({
       "id": "places",
       "type": "symbol",
       "source": {
           "type": "geojson",
           "data": {
               "type": "FeatureCollection",
               "features": [{
                   "type": "Feature",
                   "properties": {
                       "description": "Make it Mount Pleasant",
                       "icon": "theatre"
                   },
                   "geometry": {
                       "type": "Point",
                       "coordinates": [21.0328105,52.2151532]
                   }
               }, {
                   "type": "Feature",
                   "properties": {
                       "description": "Mad Men",
                       "icon": "theatre"
                   },
                   "geometry": {
                       "type": "Point",
                       "coordinates": [20.9789653,52.232324]
                   }
               }, {
                   "type": "Feature",
                   "properties": {
                       "description": "Big Backyard",
                       "icon": "bar"
                   },
                   "geometry": {
                       "type": "Point",
                       "coordinates": [21.010053,52.2497413]
                   }
               },  {
                   "type": "Feature",
                   "properties": {
                       "description": "Seersucker",
                       "icon": "bicycle"
                   },
                   "geometry": {
                       "type": "Point",
                       "coordinates": [21.0054239,52.2495126]
                   }
               }]
           }
       },
       "layout": {
           "icon-image": "{icon}-15",
           "icon-allow-overlap": true
       }
   });

   var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
      });

      map.on('mouseenter', 'places', function(e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer';

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
      });

      map.on('mouseleave', 'places', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
      });
  };


  var stores = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0133306,
            52.2474112
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 234-7336",
          "phone": "2022347336",
          "address": "1471 P St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 15th St NW",
          "postalCode": "20005",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0137089,
            52.2475324
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 507-8357",
          "phone": "2025078357",
          "address": "2221 I St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 22nd St NW",
          "postalCode": "20037",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0137598,
            52.2488676
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 387-9338",
          "phone": "2023879338",
          "address": "1512 Connecticut Ave NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at Dupont Circle",
          "postalCode": "20036",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0137673,
            52.2495606
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 337-9338",
          "phone": "2023379338",
          "address": "3333 M St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 34th St NW",
          "postalCode": "20007",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0125074,
            52.2497062
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 547-9338",
          "phone": "2025479338",
          "address": "221 Pennsylvania Ave SE",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "btwn 2nd & 3rd Sts. SE",
          "postalCode": "20003",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0099506,
            52.2507789
          ]
        },
        "properties": {
          "address": "8204 Baltimore Ave",
          "city": "College Park",
          "country": "United States",
          "postalCode": "20740",
          "state": "MD"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0093079,
            52.249199
          ]
        },
        "properties": {
          "phoneFormatted": "(301) 654-7336",
          "phone": "3016547336",
          "address": "4831 Bethesda Ave",
          "cc": "US",
          "city": "Bethesda",
          "country": "United States",
          "postalCode": "20814",
          "state": "MD"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            21.0124384,
            52.2490254
          ]
        },
        "properties": {
          "phoneFormatted": "(571) 203-0082",
          "phone": "5712030082",
          "address": "11935 Democracy Dr",
          "city": "Reston",
          "country": "United States",
          "crossStreet": "btw Explorer & Library",
          "postalCode": "20190",
          "state": "VA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.10853099823,
            38.880100922392
          ]
        },
        "properties": {
          "phoneFormatted": "(703) 522-2016",
          "phone": "7035222016",
          "address": "4075 Wilson Blvd",
          "city": "Arlington",
          "country": "United States",
          "crossStreet": "at N Randolph St.",
          "postalCode": "22203",
          "state": "VA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.28784,
            40.008008
          ]
        },
        "properties": {
          "phoneFormatted": "(610) 642-9400",
          "phone": "6106429400",
          "address": "68 Coulter Ave",
          "city": "Ardmore",
          "country": "United States",
          "postalCode": "19003",
          "state": "PA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.20121216774,
            39.954030175164
          ]
        },
        "properties": {
          "phoneFormatted": "(215) 386-1365",
          "phone": "2153861365",
          "address": "3925 Walnut St",
          "city": "Philadelphia",
          "country": "United States",
          "postalCode": "19104",
          "state": "PA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043959498405,
            38.903883387232
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 331-3355",
          "phone": "2023313355",
          "address": "1901 L St. NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 19th St",
          "postalCode": "20036",
          "state": "D.C."
          }
        }]
      };
    // This adds the data to the map
    map.on('load', function (e) {
      // This is where your '.addLayer()' used to be, instead add only the source without styling a layer
      map.addSource("places", {
        "type": "geojson",
        "data": stores
      });
      // Initialize the list
      buildLocationList(stores);

      getRoute();
    });

    // This is where your interactions with the symbol layer used to be
    // Now you have interactions with DOM markers instead
    stores.features.forEach(function(marker, i) {
      // Create an img element for the marker
      var el = document.createElement('div');
      el.id = "marker-" + i;
      el.className = 'marker';
      // Add markers to the map at all points
      new mapboxgl.Marker(el, {offset: [0, -23]})
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

      el.addEventListener('click', function(e){
          // 1. Fly to the point
          flyToStore(marker);

          // 2. Close all other popups and display popup for clicked store
          createPopUp(marker);

          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');

          e.stopPropagation();
          if (activeItem[0]) {
             activeItem[0].classList.remove('active');
          }

          var listing = document.getElementById('listing-' + i);
          listing.classList.add('active');

      });
    });


    function flyToStore(currentFeature) {
      map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
    }

    function createPopUp(currentFeature) {
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      if (popUps[0]) popUps[0].remove();


      var popup = new mapboxgl.Popup({closeOnClick: false})
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML('<h3>Sweetgreen</h3>' +
              '<h4>' + currentFeature.properties.address + '</h4>')
            .addTo(map);
    }


    function buildLocationList(data) {
      for (i = 0; i < data.features.length; i++) {
        var currentFeature = data.features[i];
        var prop = currentFeature.properties;

        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        listing.id = "listing-" + i;

        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.dataPosition = i;
        link.innerHTML = prop.address;

        var details = listing.appendChild(document.createElement('div'));
        details.className = 'firstPart';
        details.innerHTML = prop.city;
        var more = listing.appendChild(document.createElement('button'));
          more.className = 'secondPart';
          more.id = 'moreBut';
        if (prop.phone) {
          details.innerHTML += ' &middot; ' + prop.phoneFormatted;
        }
        more.innerHTML = "...";


        link.addEventListener('click', function(e){
          // Update the currentFeature to the store associated with the clicked link
          var clickedListing = data.features[this.dataPosition];

          // 1. Fly to the point
          flyToStore(clickedListing);

          // 2. Close all other popups and display popup for clicked store
          createPopUp(clickedListing);

          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');

          if (activeItem[0]) {
             activeItem[0].classList.remove('active');
          }
          this.parentNode.classList.add('active');

        });

        more.addEventListener('click', function(){
          // Update the currentFeature to the store associated with the clicked link


          // Get the modal
          var modal = document.getElementById('myModal');

          // Get the button that opens the modal
          var btn = document.getElementById('moreBut');

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];

          // When the user clicks the button, open the modal
          btn.onclick = function() {
              modal.style.display = "block";
          }

          // When the user clicks on <span> (x), close the modal

          span.onclick = function() {
              modal.style.display = "none";
          }

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }


        }


        });

      }
    }


    function openList1() {
        var list = document.getElementById("ollist");

        if (list.style.display == "none"){
            list.style.display = "block";
        }else{
            list.style.display = "none";
        }
    }
