function initMap() {
    // Create a new map centered on the world
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 0, lng: 0}
    });

    // OData API URL
    const odataUrl = 'https://data.ok.gov/datastore/odata3.0/f07e83d4-8f6e-421f-9701-7682bf01b28d?$format=json';

    // Fetch data from the OData API
    fetch(odataUrl)
        .then(response => response.json())
        .then(data => {
            // Loop through each entry in the dataset
            data.value.forEach(function(item) {
                var lat = parseFloat(item.latitude);  // Replace 'latitude' with the actual field name in your dataset
                var lng = parseFloat(item.longitude); // Replace 'longitude' with the actual field name in your dataset
                var name = item.name;                 // Replace 'name' with the actual field name in your dataset
                var address = item.address;           // Replace 'address' with the actual field name in your dataset

                // Create a marker for each entry
                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map,
                    title: name
                });

                // Create an info window for each marker
                var infowindow = new google.maps.InfoWindow({
                    content: `<h3>${name}</h3><p>${address}</p>`
                });

                // Add a click listener to open the info window when the marker is clicked
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error fetching data from the OData API:', error));
}
