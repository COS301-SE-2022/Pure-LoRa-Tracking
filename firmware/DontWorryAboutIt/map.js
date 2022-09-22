let globallatlngs={
    latitude:0,
    longitude:0
}
const reserves={
    "tuks":[20,20],
    "rietvlei":[10,10],
}

var map = L.map('map').setView(reserves.tuks, 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

document.on

marker = new L.marker(map.getCenter(), { draggable:'true'}).addTo(map);
map.on('click', function(e) {
    console.log(map.getCenter())
})

marker.on("moveend", function(e) {
    const temp=marker.getLatLng()
    document.getElementById("showlat").innerHTML=temp.lat;
    document.getElementById("showlng").innerHTML=temp.lng;
    globallatlngs.latitude=temp.lat;
    globallatlngs.longitude=temp.lng;
    console.log(globallatlngs)
});
function refocusmarker() {
    marker.setLatLng(map.getCenter());
    const temp=marker.getLatLng()
    document.getElementById("showlat").innerHTML=temp.lat;
    document.getElementById("showlng").innerHTML=temp.lng;
    globallatlngs.latitude=temp.lat;
    globallatlngs.longitude=temp.lng;
}

function changelocation(){
    const temp=document.getElementById("reserveselect");
    const temp2=temp.value;
    console.log(temp2);
    map.setView(reserves[temp2]);
}

$(document).ready(function(){
    $("#sendbtn").on("click",()=>{
        $.ajax({
            type: "POST",
            url: "url",
            data: {
                latitude:globallatlngs.latitude,
                longitude:globallatlngs.longitude
            },
            success: function (response) {
                alert(response)
            }
        });
    })
})