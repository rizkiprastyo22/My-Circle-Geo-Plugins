function search(search) {
  var val = search;
  var list = [];
  fetch(`https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248b92552d10a984cd0b0203a875a9341a2&text=${val}`, {
    method: 'GET'
  })
    .then(response => {
      response.json();
      list = response.data.features;
    })
}