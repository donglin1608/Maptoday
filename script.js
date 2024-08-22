function initMap() {
    // Create a new map centered on the world
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 36.5, lng: -97.5}  // Center the map roughly around Oklahoma
    });

    // OData API URL
    const odataUrl = 'https://data.ok.gov/datastore/odata3.0/f07e83d4-8f6e-421f-9701-7682bf01b28d?$format=json';

    // Fetch data from the OData API
    fetch(odataUrl)
        .then(response => response.json())
        .then(data => {
            // Loop through each entry in the dataset
            data.value.forEach(function(item) {
                var lat = parseFloat(item.LATITUDE);  // Use the 'LATITUDE' column from your dataset
                var lng = parseFloat(item.LONGITUDE); // Use the 'LONGITUDE' column from your dataset
                var name = item.NAME;                 // Use the 'NAME' column from your dataset
                var address = item.ADDRESS;           // Use the 'ADDRESS' column from your dataset

                // Check if latitude and longitude are valid numbers
                if (!isNaN(lat) && !isNaN(lng)) {
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
                } else {
                    console.error('Invalid latitude or longitude for item:', item);
                }
            });
        })
        .catch(error => console.error('Error fetching data from the OData API:', error));
}
