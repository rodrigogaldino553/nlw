const options = {
    dragging:false,
    touchZooom:false,
    doubleClickZoom:false,
    scrollWheelZoom:false,
    zoomControl:false
}

const spanLat = document.querySelector('span[data-lat]').dataset.lat
const spanLng = document.querySelector('span[data-lng]').dataset.lng

const map = L.map('mapid', options).setView([spanLat, spanLng], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create map

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconsize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


L
    .marker([spanLat, spanLng], {icon})
    .addTo(map)


//image Galery

function selectImage(event){
    const button = event.currentTarget
    const buttons = document.querySelectorAll('.images button')

    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove('active')
    }

    const image = button.children[0]
    
    const imageContainer = document.querySelector('.orphanage-details > img')

    imageContainer.src = image.src

    button.classList.add('active')
}
