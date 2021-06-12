// import usJson from '../coba/us'

// cara dapet Map
var map = window.globalMap;
var layergroup = L.layerGroup().addTo(map);
map.setView([0, 125], 5);

/*==============================================
                    BASEMAP SELECTION
================================================*/
// Google Streets
var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }
);

// Watercolor
var watercolor = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 1,
    maxZoom: 16,
    ext: "jpg"
  }
);

// OSM layer
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Dark map
var dark = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }
).addTo(layergroup);

// Google satellite
var googleSat = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  }
);

/*==============================================
                  SIGNATURE
================================================*/

// require , gk ada..
// tidak bisa import dari nodes_modules , dan package yang terinstall
// axios, di ganti sama fetch()
// kita perlu Map, window.globalMap

function utcDate(val) {
  return new Date(
      Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + parseInt(val),
          0,
          0,
          0
      )
  );
}

var categoryColor = {
  1: "#FFE922",
  2: "#FFE922",
  3: "#FFE922",
  4: "#FFE922",
  5: "#FFE922",
  6: "#FE9900",
  7: "#FE9900",
  8: "#FE9900",
  9: "#FE9900",
  10: "#CC0033"
}

// https://signature.bmkg.go.id/api/signature/impact/public/higher
var time = {}

fetch('https://signature.bmkg.go.id/api/signature/impact/public/higher', {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
      // console.log()
      // response adalah listtime 
      time = data.data
      // get current by today utc
      var current = new Date(utcDate(0)).toISOString()
      fetch(`https://signature.bmkg.go.id/api/signature/impact/public/list/${current}`, {
          method: 'GET'
      })
          .then(response => response.json())
          .then(data => {
              data.data.forEach(element => {
                  L.geoJSON(element.area, {
                      // pane:"labels",
                      style: function (e) {
                          return {
                              fillOpacity: 1,
                              fillColor: categoryColor[e.properties.category],
                              weight: 0,
                          }
                      },
                      onEachFeature: function (feature, layer) {
                          layer.bindPopup(`<div style="margin-top:20px;margin-bottom:20px;margin-right:15px;">Category Layer : ${feature.properties.category}</div>`, { autoClose: true });
                        }
                  }
                  ).addTo(layergroup)
              });
          });
  });




/*==============================================
                    Ovlerlay
================================================*/

// require , gk ada..
// tidak bisa import dari nodes_modules , dan package yang terinstall
// axios, di ganti sama fetch()
// kita perlu Map, window.globalMap

// function utcDate(val) {
//   return new Date(
//       Date.UTC(
//           new Date().getFullYear(),
//           new Date().getMonth(),
//           new Date().getDate() + parseInt(val),
//           0,
//           0,
//           0
//       )
//   );
// }

// var categoryColor = {
//   1: "#FFE922",
//   2: "#FFE922",
//   3: "#FFE922",
//   4: "#FFE922",
//   5: "#FFE922",
//   6: "#FE9900",
//   7: "#FE9900",
//   8: "#FE9900",
//   9: "#FE9900",
//   10: "#CC0033"
// }

// // https://signature.bmkg.go.id/api/signature/impact/public/higher
// var time = {}

// fetch('https://signature.bmkg.go.id/api/signature/impact/public/higher', {
//   method: 'GET'
// })
//   .then(response => response.json())
//   .then(data => {
//       // console.log()
//       // response adalah listtime 
//       time = data.data
//       // get current by today utc
//       var current = new Date(utcDate(0)).toISOString()
//       fetch(`https://signature.bmkg.go.id/api/signature/impact/public/list/${current}`, {
//           method: 'GET'
//       })
//           .then(response => response.json())
//           .then(data => {
//               data.data.forEach(element => {
//                   L.geoJSON(element.area, {
//                       // pane:"labels",
//                       style: function (e) {
//                           return {
//                               fillOpacity: 1,
//                               fillColor: categoryColor[e.properties.category],
//                               weight: 0,
//                           }
//                       },
//                       onEachFeature: function (feature, layer) {
//                           layer.bindPopup(`<div style="margin-top:20px;margin-bottom:20px;margin-right:15px;">Category Layer : ${feature.properties.category}</div>`, { autoClose: true });
//                         }
//                   }
//                   ).addTo(layergroup)
//               });
//           });
//   });


/*==============================================
                LAYER CONTROL
================================================*/
var baseMaps = {
  "Dark Mode Map": dark,
  "Google Satellite": googleSat,
  "Open Street Map": osm,
  "Watercolor Map": watercolor,
  "Google Street": googleStreets
};
var overlayMaps = {
  // "Signature": signature
  // "Density 50 - 200": usData1,
  // "Density < 50": usData2
};

// this.map.removeLayer(signature);

L.control
  .layers(baseMaps, overlayMaps, { collapsed: false })
  .addTo(window.globalMap);

// Put zoom control in bottom right
L.control
  .zoom({
    position: "bottomright"
  })
  .addTo(window.globalMap);


/*==============================================
                METHOD
================================================*/

