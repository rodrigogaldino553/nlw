//var map = L.map('mapid').setView([-27.222633, -49.6455874], 15);
var map
function getLocation() {
    //para pegar a posicao do usuario
    let lat = 0
    let lng = 0
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        lng = position.coords.longitude
        console.log(`${lat}, ${lng}`)
        map = L.map('mapid').setView([lat, lng], 15)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        initialize()
    })
    //map = L.map('mapid').setView([lat, lng], 15)//([-27.222633, -49.6455874], 15);

}

getLocation()

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create map

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconsize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


function addMarker({ id, name, lat, lng }) {

    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg"></a>`)

    L
        .marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(popup);

}

function initialize(){
const orphanagesSpan = document.querySelectorAll('.orphanages span')
orphanagesSpan.forEach(span => {
    const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }
    addMarker(orphanage)

})
}
