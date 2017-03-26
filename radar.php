<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Search for up to 200 places with Radar Search</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>


    <script>
var map;
var infoWindow;
var service;
var markers = [];
var jsonArray;


function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -16.6844262,
            lng: -49.2687195
        },
        zoom: 13
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
        keyword: 'Frutos do Brasil',
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

    var wait;

    while (wait) {};

    service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                wait = true;
                setTimeout("wait = true", 2000);
                //alert("OQL: " + status);
            } else {
                alert(status);
            }

            return;
        }

        var marker;

        if (result.types[0] == "atm") {
            marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location,
                icon: {
                    url: 'http://i.imgur.com/q3FIwSJ.png',
                }
            });
        } else if (result.types[0] == "bank" || result.types[0] == "finance") {
            marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location,
                icon: {
                    url: 'http://i.imgur.com/ophJkM1.png',
                }
            });
        } else {
            marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location,
                icon: {
                    url: 'http://i.imgur.com/ophJkM1.png',
                }
            });
        }

        // var teste = {
        //     nome: result.name,
        //     enderecoformatado: result.formatted_address,
        //     localizacao: result.geometry.location,
        //     telefone: result.international_phone_number,
        //     categoria: result.types[0],
        //     website: result.website,
        //     endereco: result.address_components,
        //     fotos: result.photos,
        //     cidade: result.vicinity,
        // };

        var teste = {
            nome: result.name,

            localizacao: {
                cordenadas: result.geometry.location,
            },
            tipo: {
                nome: 'Loja',
                slug: 'loja'
            }
        }

        // console.log(teste);

        google.maps.event.addListener(marker, 'click', function() {

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + result.name + '</h1>' +
                '<div id="bodyContent">' +
                '<p>' + result.formatted_address + '</p>' +
                '</div>' +
                '</div>';

            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
        });

        markers.push(teste);

    });



}



function gerarJson() {
    jsonArray = JSON.stringify(markers);

    console.log(jsonArray);
}


setTimeout(function() {
    initMap();
    gerarJson();
}, 2000);


    </script>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCS2P2STjwd6KEIvL0MjFijB_76OJVkToA&callback=initMap&libraries=places,visualization" async defer></script>
  </body>
</html>