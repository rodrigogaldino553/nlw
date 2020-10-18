//const { response } = require("express")

//var map = L.map('mapid').setView([-27.222633, -49.6455874], 15);
var map

async function getCityName(lat, lng) {
    try {
        const url = `https://geocode.xyz/${lat},${lng}?json=1`
        const data = await fetch(url).then(response => response.json())
        console.log(data)
        document.getElementById('city').innerHTML = data.region.split(',')[0]
        document.getElementById('state').innerHTML = data.region.split(',')[1]
    } catch (error) {
        alert('Não foi possível pegar sua localização')
    }
}


function getLocation() {
    //para pegar a posicao do usuario
    let lat = 0
    let lng = 0
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude//-27.222633//
        lng = position.coords.longitude//-49.6455874
        console.log(`${lat}, ${lng}`)

        map = L.map('mapid').setView([lat, lng], 15)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        initialize()
        getCityName(lat, lng)
    })

}



const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconsize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

function start() {
    const message = location.search.slice(1).split('=')[1]//.split('&').split('=')[1]
    alert(message.replace(/%20/g, ' '))
}

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

function initialize() {
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

getLocation()
start()
