<template>
  <div>
    <div class="col-md-12">
      <div class="input-group">
        <input
          v-model="searching"
          type="text"
          class="form-control"
          placeholder="Search location in US ..."
          @keyup="searchDataMethod($event)"
        />

        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <b-icon-search></b-icon-search>
          </span>
        </div>
      </div>
    </div>

    <div v-if="list.length > 0" style="position: absolute; left: 15px;">
      <div
        v-for="(value, index) in list.slice(0, 8)"
        :key="index"
        @click="searchData(value)"
        style="
          cursor: pointer;
          padding: 5px;
          border: 1px solid #000;
          margin-top: 5px;
          background-color: white;
        "
      >
        <div>{{ value.properties.name }}</div>
        <div>{{ value.properties.region }}, {{ value.properties.country }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searching: "",
      list: [],
    };
  },
  methods: {
    searchData(obj) {
      this.$emit("searching", obj);
    },
    searchDataMethod(e) {
      //   console.log(e.target.value);
      var val = e.target.value;
      if (val !== "" && val.length > 3) {
        axios
          .get(
            `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248b92552d10a984cd0b0203a875a9341a2&text=${val}`
          )
          .then((res) => {
            this.list = res.data.features;
          });
      }
    },
  },
};
</script>