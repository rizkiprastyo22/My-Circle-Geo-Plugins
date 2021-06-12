// L.geoJson(usJson, {
//     style: this.styling, // this + . + nama function
//     onEachFeature: this.onEachFeature,
//   }).addTo(this.map);

//    // Fetch density data on click
//    onEachFeature(feature, layer) {
//     var that = this;
//     layer.on("click", function (e) {
//       that.dataClick = e.target.feature.properties;
//     });
//   },

//   // US Map style
//   styling() {
//     return {
//       fillColor: "white",
//       fillOpacity: 0.7,
//       opacity: 0.1,
//     };
//   },

//   // Density > 200 style
//   large(e) {
//     return {
//       fillColor: this.getColorLarge(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
//       fillOpacity: 0.7,
//       opacity: 0.1,
//       // weight: 1,
//       // dashArray: "3",
//     };
//   },

//   // Density 50-200 style
//   medium(e) {
//     return {
//       fillColor: this.getColorMedium(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
//       fillOpacity: 0.7,
//       opacity: 0.1,
//       // weight: 1,
//       // dashArray: "3",
//     };
//   },

//   // Density < 50 style
//   small(e) {
//     return {
//       fillColor: this.getColorSmall(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
//       fillOpacity: 0.7,
//       opacity: 0.1,
//       // weight: 1,
//       // dashArray: "3",
//     };
//   },

//   // Density > 200 color
//   getColorLarge(d) {
//     return d > 1000
//       ? "#800026"
//       : d > 500
//       ? "#BD0026"
//       : d > 200
//       ? "#E31A1C"
//       : "transparent";
//   },

//   // Density 50-200 color
//   getColorMedium(d) {
//     return d > 200
//       ? "transparent"
//       : d > 100
//       ? "#FC4E2A"
//       : d > 50
//       ? "#FD8D3C"
//       : "transparent";
//   },

//   // Density < 50 color
//   getColorSmall(d) {
//     return d > 50
//       ? "transparent"
//       : d > 20
//       ? "#FEB24C"
//       : d > 10
//       ? "#FED976"
//       : d > 1
//       ? "#FFEDA0"
//       : "transparent";
//   },
// },