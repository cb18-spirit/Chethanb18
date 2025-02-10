let map;
let service;
let infowindow;

function initMap() {
    const defaultLocation = { lat: 12.9716, lng: 77.5946 }; // Bangalore as default
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
    });
}

function searchLocation() {
    let place = document.getElementById("place-search").value;
    let request = {
        query: place,
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map,
                position: results[0].geometry.location,
            });
        } else {
            alert("Place not found!");
        }
    });
}
