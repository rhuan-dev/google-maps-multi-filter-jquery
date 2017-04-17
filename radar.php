<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Radar Locais</title>
    <style>
        #map {
            height: 100%;
        }
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
    <script>
        var map;
        var infoWindow;
        var service;
        
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP, // tipo de mapa
                center: {
                    lat: -16.681201, 
                    lng: -49.257864
                },
                zoom: 15
            });

            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);

            // The idle event is a debounced event, so we can query & listen without
            // throwing too many requests at the server.
            map.addListener('idle', performSearch);
        }

        function performSearch() {
            var request = {
                bounds: map.getBounds(),
                keyword: 'Sicoob'
            };
            service.radarSearch(request, callback);
        }

        function callback(results, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            for (var i = 0, result; result = results[i]; i++) {
                addMarker(result);
            }
        }

        function addMarker(place) {

            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: {
                    url: 'http://i.imgur.com/ophJkM1.png',
                    scaledSize: new google.maps.Size(30, 40)
                }
            });
        
            google.maps.event.addListener(marker, 'click', function() {
                service.getDetails(place, function(result, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    infoWindow.setContent(result.name);
                    infoWindow.open(map, marker);
                });
            });
        }
    </script>
</head>

<body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCS2P2STjwd6KEIvL0MjFijB_76OJVkToA&callback=initMap&libraries=places,visualization" async defer></script>
</body>

</html>