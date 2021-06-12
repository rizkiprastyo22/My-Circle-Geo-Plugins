<template>
  <div id="app" style="position: relative">
    <Search
      style="position: absolute; left: 0px; top: 10px; z-index: 1000"
      @searching="searchLocation"
    />
    <Maps ref="maps" />
  </div>
</template>

<script>
import Search from "./components/Search";
import Maps from "./components/Maps.vue";
import L from "leaflet";

export default {
  name: "App",
  components: {
    Search,
    Maps,
  },
  data() {
    return {
      halo: "hola",
    };
  },
  methods: {
    searchLocation(obj) {
      var maps = this.$refs["maps"].map;
      // clear marker sebelum add
      L.marker(obj.geometry.coordinates.reverse()).addTo(maps);
      maps.setView(obj.geometry.coordinates, 8);
    },
  },
};
</script>
