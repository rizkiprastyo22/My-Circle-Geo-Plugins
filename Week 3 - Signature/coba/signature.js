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
// cara dapet Map
var map = window.globalMap
var layergroup = L.layerGroup().addTo(map)
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

console.log(window)

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


