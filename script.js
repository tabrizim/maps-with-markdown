// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(33.934245,-40.605469); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow -- its content and position change when you click on a
// marker
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "";

// I'm complicating things a bit with this next set of variables, which will help us
// with marker colors
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "/media/cc.png";
var red_markers = [];
var blue_markers = [];

var columbus_to_PR_coord = [
  {lng: -6.976318, lat: 37.173449}, //August 3, 1492
  {lng: -15.441284, lat: 28.14466},
  {lng: -16.193848, lat: 28.671311},
  {lng: -16.809082, lat: 28.661671},
  {lng: -17.248535, lat: 28.164033},
  {lng: -17.484741, lat: 28.926439},
  {lng: -42.533569, lat: 31.240985},
  {lng: -66.165161, lat: 28.347899},
  {lng: -75.673828, lat: 23.362429},
  {lng: -74.959717, lat: 22.866053},
  {lng: -74.536743, lat: 22.702722},
  {lng: -74.050598, lat: 22.668511},
  {lng: -75.342865, lat: 22.13526},
  {lng: -77.132263, lat: 21.626793},
  {lng: -74.871826, lat: 21.053744},
  {lng: -73.168945, lat: 19.890723},
  {lng: -72.592163, lat: 20.164255},
  {lng: -71.960449, lat: 19.87006},
  {lng: -71.949463, lat: 19.890723},
  {lng: -71.971436, lat: 19.730513},
  {lng: -71.949463, lat: 19.828725} //12 Oct. 1492  san salvador
]; //70*24hours


// Define the symbol, using one of the predefined paths ('CIRCLE')
// supplied by the Google Maps JavaScript API.
var columbus_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#000000'
};

var columbus_to_PR = new google.maps.Polyline({
  path: columbus_to_PR_coord,
  geodesic: false,
  strokeColor: '#000000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: columbus_ico,
    offset: '0%'
  }],
});

var mayflower_coord = [
  {lng: -1.374207, lat: 50.861444}, //Southampton 6th sep 1620
  {lng: -1.999512, lat: 50.373496},
  {lng: -2.993774, lat: 50.419019},
  {lng: -3.546181, lat: 50.30513},
  {lng: -3.562317, lat: 50.342393},
  {lng: -3.629608, lat: 50.175139},
  {lng: -3.843842, lat: 50.142586},
  {lng: -4.085541, lat: 50.230516},
  {lng: -4.148712, lat: 50.34546},
  {lng: -4.367065, lat: 50.057139},
  {lng: -35.068359, lat: 45.151053},
  {lng: -69.963684, lat: 42.013591},
  {lng: -69.964142, lat: 41.990119},
  {lng: -70.123444, lat: 42.155259},
  {lng: -70.321198, lat: 42.075801},
  {lng: -70.16304, lat: 41.982973},
  {lng: -70.142441, lat: 42.038074},
  {lng: -70.168419, lat: 42.046233},
  {lng: -70.167046, lat: 42.046233},
  {lng: -70.152512, lat: 42.01053},
  {lng: -70.375099, lat: 42.021243},
  {lng: -70.651817, lat: 41.988588} //Cape Cod on 9th November 1620
]; //64*24hours

var mayflower_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#29d100'
};

var mayflower = new google.maps.Polyline({
  path: mayflower_coord,
  geodesic: false,
  strokeColor: '#29d100',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: mayflower_ico,
    offset: '0%'
  }],
});

var cargo_ship_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#f7b000'
};

//9days
var cargo_ship_coord = [
  {lng: -4.1418455, lat: 50.3657705}, //plymouht UK
  {lng: -74.0176809, lat: 40.7054754} // NYC USA
];

var cargo_ship = new google.maps.Polyline({
  path: cargo_ship_coord,
  geodesic: false,
  strokeColor: '#f7b000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: cargo_ship_ico,
    offset: '0%'
  }],
});

var cargo_plane_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#ff0087'
};
//8 hours
var cargo_plane_coord = [
  {lng: -4.1058330, lat: 50.4227780}, //plymouht UK
  //{lng: -43.066406, lat: 57.462681}, //mid
  {lng: -73.7789250, lat: 40.6397510} // NYC JFK
];

var cargo_plane = new google.maps.Polyline({
  path: cargo_plane_coord,
  geodesic: true,
  strokeColor: '#ff0087',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: cargo_plane_ico,
    offset: '0%'
  }],
});

var savannah_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#ff0000'
};

var savannah_coord = [
  {lng: -81.15147, lat: 32.128464}, //savannah  May 20
  {lng: -7.794800, lat: 51.000000},
  {lng: -5.383301, lat: 52.555481},
  {lng: -5.119629, lat: 53.689388},
  {lng: -3.019351, lat: 53.466613} // Liverpool June 20
]; //31*24hours

var savannah = new google.maps.Polyline({
  path: savannah_coord,
  geodesic: false,
  strokeColor: '#ff0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: savannah_ico,
    offset: '0%'
  }],
});


var zeppelin_ico = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 4,
  strokeColor: '#727272'
};
//8 hours
var zeppelin_coord = [
  {lng: 9.480011, lat: 47.661765}, //friedrichshaften?
  {lng: -74.311257, lat: 40.014561} // lakehurst NJ
];

var zeppelin = new google.maps.Polyline({
  path: zeppelin_coord,
  geodesic: true,
  strokeColor: '#727272',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    icon: zeppelin_ico,
    offset: '0%'
  }],
});

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle() {
  var countC = 0;
  var countM = 0;
  var countS = 0;
  var countCS = 0;
  var countP = 0;
  var countZ = 0;

  window.setInterval(function() {
    var speed=8;
    countC = (countC + 1) % (84000/speed); //1680
    countM = (countM + 1) % (76800/speed); //2304
    countS = (countS + 1) % (37200/speed); //744hr
    countCS = (countCS + 1) % (10800/speed); //216
    countP = (countP + 1) % (400/speed); //8hr
    countZ = (countZ + 1) % (400*112/8/speed); //8hr

    var iconC = columbus_to_PR.get('icons');
    iconC[0].offset = (countC / 840*speed) + '%';
    columbus_to_PR.set('icons', iconC);

    var iconM = mayflower.get('icons');
    iconM[0].offset = (countM / 768*speed) + '%';
    mayflower.set('icons', iconM);

    var iconS = savannah.get('icons');
    iconS[0].offset = (countS / 372*speed) + '%';
    savannah.set('icons', iconS);

    var iconCS = cargo_ship.get('icons');
    iconCS[0].offset = (countCS / 108*speed) + '%';
    cargo_ship.set('icons', iconCS);

    var iconP = cargo_plane.get('icons');
    iconP[0].offset = (countP / 4*speed) + '%';
    cargo_plane.set('icons', iconP);

    var iconZ = zeppelin.get('icons');
    iconZ[0].offset = (countZ / (4*112/8)*speed) + '%';
    zeppelin.set('icons', iconZ);


}, 20);
}



/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initialize() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 3,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.STREETMAP // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);


    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(37.173449,-6.976318),
              map: my_map,
              icon: './media/cc.png', // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Christopher Columbus",
              window_content: "<h1 class='black'>Christopher Columbus</h1><p class='black'> On August 3, 1492, Columbus set sail from the Port of Palos in search of passage to East Asia. After 70 dyas of travelling at sea, Columbus and his crew found land in what is now known as San Salvador</p>"
             },
             {position: new google.maps.LatLng(50.909704,-1.435713),
              map: my_map,
              icon: './media/southampton.png', // this sets the image that represents the marker in the map
              title: "The Mayflower Voyage",
              window_content: "<h1 class='black'>The Mayflower Voyage</h1><p class='black'> The Mayflower left Southampton port on August 5, 1620 and after some issues with its companion ship ' The Speedwell', arrived at Plymouth and finaly set sail for the West on September 6. After 64 days, the Mayflower arrived in America at Cape Code.</p>"
            },
            {position: new google.maps.LatLng(50.4227780,-4.1058330),
             map: my_map,
             icon: './media/plymouth.png', // this sets the image that represents the marker in the map
             title: "Plymouth",
             window_content: "<h1 class='black'>Modern Travel</h1><p class='black'>Today, it only takes 9 days by ship and 8 hours by plane to travel from plymouth to New York City!</p>"
           },
            {position: new google.maps.LatLng(32.128464,-81.15147),
             map: my_map,
             icon: './media/savannah.png', // this sets the image that represents the marker in the map
             title: "First Steam Ship Voyage Across Atlantic",
             window_content: "<h1 class='black'>First Steam Ship Voyage Across Atlantic</h1><p class='black'>On May 24, the Savannah became the first steam ship to set sail across the Atlantic from Savannah, Gerogia and arrived in Liverpool, Englad on June 20. Although the SS Savannah was the first 'steam' ship to make it across the Atlantic, it was technically a steam/sail ship hybrid and only used its enginer for a total of 80 hours of its 29 day voyage.  </p>"
           },
          {position: new google.maps.LatLng(47.661765,9.480011),
           map: my_map,
           icon: './media/zeppelin.png', // this sets the image that represents the marker in the map
           title: "First Transatlantic Zeppelin Voyage",
           window_content: "<h1 class='black'>First Transatlantic Zeppelin Voyage</h1><p class='black'> In October 1928, the Graf Zeppelin made the 111 hour trip from Friedrichshafen, Germany to Lakehurst, New Jersey. Becoming the first zeppeling to make the Transatlantic trip.</p>"
          },
           {position: new google.maps.LatLng(53.466613,-3.019351),
            map: my_map,
            icon: './media/Liverpool.png', // this sets the image that represents the marker in the map
            title: "third Marker",
            window_content: "<h1>Marker3</h1><p> and this would be the extended description</p>"
          }
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
        //legendHTML += "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> <h3>" + marker.title + "</h3><div>" + marker.window_content + "</div></div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    //line.setMap(my_map);
    columbus_to_PR.setMap(my_map);
    mayflower.setMap(my_map);
    savannah.setMap(my_map);
    cargo_ship.setMap(my_map);
    cargo_plane.setMap(my_map);
    zeppelin.setMap(my_map);
    document.getElementById("map_legend").innerHTML = legendHTML;

}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

// I added this for fun.  It allows you to trigger the infowindow
// form outside the map.
// function locateMarker (marker) {
//     console.log(marker);
//     my_map.panTo(marker.marker.position);
//     google.maps.event.trigger(marker.marker, 'click');
// }
