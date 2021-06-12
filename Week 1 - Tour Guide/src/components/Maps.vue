<template>
  <div class="hello">
    <div style="position: relative">
      <div
        style="position: absolute; left: 15px; bottom: 5px; z-index: 1000000"
      >
      
        <div class="row" style="margin-bottom:10px;">
          <div class="col-md-12">
            <div class="square-rad">
              <h5 style="margin: 20px; color:white;"><strong>Data Density US</strong></h5>
            </div>
          </div>
          <div class="col-md-6" v-for="(value, key) in dataClick" :key="key">
            <div class="square-rad text-center">
                <span style="color:white;">{{ key.name }} {{ value }}</span>
            </div>
          </div>
        </div>

      </div>
      <div id="map" style="height: 100vh; width: 100vw"></div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import L from "leaflet";
import usJson from "@/components/us.js";

export default {
  data() {
    return {
      map: null,
      dataClick: {},
    };
  },
  mounted() {
    this.map = L.map("map", {
      center: [38.46028527452697, -92.20360091340156],
      zoom: 5,
      zoomControl: false,
    });

    /*==============================================
                    BASEMAP SELECTION
    ================================================*/
    // Google Streets
    var googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    ).addTo(this.map);

    // Watercolor
    var watercolor = L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        minZoom: 1,
        maxZoom: 16,
        ext: "jpg",
      }
    );

    // OSM layer
    var osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    // Dark map
    var dark = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    );

    // Google satellite
    var googleSat = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    /*==============================================
                    Ovlerlay
    ================================================*/

    // US Selection
    L.geoJson(usJson, {
      style: this.styling, // this + . + nama function
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);

    // Density > 200
    // axios.get("/us.json").then((res) => {
    var usData = L.geoJson(usJson, {
      style: this.large, // this + . + nama function
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);
    // });

    // Density 50 - 200
    // axios.get("/us.json").then((res) => {
    var usData1 = L.geoJson(usJson, {
      style: this.medium, // this + . + nama function
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);
    // });

    // Density < 50
    // axios.get("/us.json").then((res) => {
    var usData2 = L.geoJson(usJson, {
      style: this.small, // this + . + nama function
      onEachFeature: this.onEachFeature,
    }).addTo(this.map);
    // });

    /*==============================================
                    LAYER CONTROL
    ================================================*/
    var baseMaps = {
      "Google Street": googleStreets,
      "Open Street Map": osm,
      "Watercolor Map": watercolor,
      "Dark Mode Map": dark,
      "Google Satellite": googleSat,
    };
    var overlayMaps = {
      "Density > 200": usData,
      "Density 50 - 200": usData1,
      "Density < 50": usData2,
    };

    // Uncheck density checkbox
    this.map.removeLayer(usData);
    this.map.removeLayer(usData1);
    this.map.removeLayer(usData2);

    L.control
      .layers(baseMaps, overlayMaps, { collapsed: false })
      .addTo(this.map);

    // Put zoom control in bottom right
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(this.map);
  },

  /*==============================================
                    METHOD
  ================================================*/

  methods: {
    // Fetch density data on click
    onEachFeature(feature, layer) {
      var that = this;
      layer.on("click", function (e) {
        that.dataClick = e.target.feature.properties;
      });
    },

    // US Map style
    styling() {
      return {
        fillColor: "white",
        fillOpacity: 0.7,
        opacity: 0.1,
      };
    },

    // Density > 200 style
    large(e) {
      return {
        fillColor: this.getColorLarge(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
        fillOpacity: 0.7,
        opacity: 0.1,
        // weight: 1,
        // dashArray: "3",
      };
    },

    // Density 50-200 style
    medium(e) {
      return {
        fillColor: this.getColorMedium(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
        fillOpacity: 0.7,
        opacity: 0.1,
        // weight: 1,
        // dashArray: "3",
      };
    },

    // Density < 50 style
    small(e) {
      return {
        fillColor: this.getColorSmall(e.properties.density), // javascript khususnya di vue , akses methods selalu this.
        fillOpacity: 0.7,
        opacity: 0.1,
        // weight: 1,
        // dashArray: "3",
      };
    },

    // Density > 200 color
    getColorLarge(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : "transparent";
    },

    // Density 50-200 color
    getColorMedium(d) {
      return d > 200
        ? "transparent"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : "transparent";
    },

    // Density < 50 color
    getColorSmall(d) {
      return d > 50
        ? "transparent"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : d > 1
        ? "#FFEDA0"
        : "transparent";
    },
  },
};
</script>