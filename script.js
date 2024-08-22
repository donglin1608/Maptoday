function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 41.8781, lng: -87.6298} // Centered on Chicago
    });

    // URL to fetch the Google Sheets data in CSV format
    var sheetUrl = 'https://docs.google.com/spreadsheets/d/1nBJ0984DRA4wHCezmLaCO_poDfr70fnWvS-qBRmcYLw/edit?usp=sharing';

    // Fetch the data
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            var rows = data.split('\n').slice(1); // Split the CSV data into rows
            rows.forEach(row => {
                var columns = row.split(',');
                var lat = parseFloat(columns[0].trim());
                var lng = parseFloat(columns[1].trim());
                var title = columns[2].trim();

                if (!isNaN(lat) && !isNaN(lng)) {
                    var marker = new google.maps.Marker({
                        position: {lat: lat, lng: lng},
                        map: map,
                        title: title
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
}
