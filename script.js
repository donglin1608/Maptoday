function initMap() {
    // Initialize the map centered on Oklahoma
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 35.4676, lng: -97.5164},  // Center the map on Oklahoma City
        mapTypeId: 'roadmap'
    });

    // Set up the Street View Panorama
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: {lat: 35.4676, lng: -97.5164},  // Initialize Street View position
            pov: {heading: 165, pitch: 0},  // Set initial point of view
            zoom: 1
        }
    );

    // Link the map to the Street View
    map.setStreetView(panorama);

    // OData API URL
    const odataUrl = 'https://data.ok.gov/datastore/odata3.0/f07e83d4-8f6e-421f-9701-7682bf01b28d?$format=json';

    // Fetch data from the OData API
    fetch(odataUrl)
        .then(response => response.json())
        .then(data => {
            data.value.forEach(function(item) {
                var lat = parseFloat(item.LATITUDE);
                var lng = parseFloat(item.LONGITUDE);
                var name = item.NAME;
                var address = item.ADDRESS;

                if (!isNaN(lat) && !isNaN(lng)) {
                    // Create a marker for each location in the dataset
                    var marker = new google.maps.Marker({
                        position: {lat: lat, lng: lng},
                        map: map,
                        title: name
                    });

                    // When the marker is clicked, update the Street View position and POV
                    marker.addListener('click', function() {
                        panorama.setPosition(marker.getPosition());
                        panorama.setPov({
                            heading: 34,
                            pitch: 10
                        });
                        panorama.setVisible(true);
                        map.setStreetView(panorama);
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching data from the OData API:', error));
}
