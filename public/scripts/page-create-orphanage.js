var map
function getLocation() {
    //para pegar a posicao do usuario
    let lat = 0
    let lng = 0
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        lng = position.coords.longitude
        console.log(`${lat}, ${lng}`)
        map = L.map('mapid').setView([lat, lng], 25)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        initialize()
    })

}


function start() {
    const message = location.search.slice(1).split('=')[1]//.split('&').split('=')[1]
    alert(message.replace('%20', ' '))
}

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconsize: [58, 68],
    iconAnchor: [29, 68],
})


let marker;

function initialize() {
    map.on('click', (event) => {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;

        document.querySelector('[name="lat"]').value = lat
        document.querySelector('[name="lng"]').value = lng


        marker && map.removeLayer(marker)
        marker = L.marker([lat, lng], { icon })
            .addTo(map)

        document.querySelector('.map-container').classList.add('green-border')

    })
}

function addPhotoField() {
    const container = document.querySelector('#images')

    const fieldsContainer = document.querySelectorAll('.new-upload')
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    const input = newFieldContainer.children[0]

    if (input.value == "") {
        return
    }
    newFieldContainer.children[0].value = ""

    container.appendChild(newFieldContainer)


}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        span.parentNode.children[0].value = ""
        return
    }

    span.parentNode.remove()



}

function toggleSelect(event) {
    document.querySelectorAll('.button-select button')
        .forEach((button) => {
            button.classList.remove('active')
        })

    const button = event.currentTarget
    button.classList.add('active')


    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}

function validate(event) {
    //verificar se ta tudo preenchido
    //const needMap = true
    const lat = document.querySelector('[name="lat"]').value
    if (lat == '') {
        event.preventDefault()//nao evia o formulario
        alert('selecione um ponto no mapa')
    }

}


getLocation()
start()
