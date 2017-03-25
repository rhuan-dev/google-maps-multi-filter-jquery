jQuery.noConflict();
jQuery(document).ready(function($) {
    /**
     * Initial Map
     */
    function initMap() {
        // localização inicial
        var myLatlng = new google.maps.LatLng(-16.698008, -49.296640);

        // opções mapa inicial
        var mapOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            mapTypeControl: false,
        }

        // Exibir o mapa na div #mapa;
        map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

        /**
         * Extract locations
         * Add Markers Positions
         */
        $.getJSON('locais.json', function(data, textStatus) {
            $.each(data, function(i, item) {

                // function add marker
                addMarker(item);
                console.log(item.localizacao.pais.slug);
            });
        });
    }


    /**
     * Add marker functions
     */
    function addMarker(marker) {
        var title = marker.nome;
        var pais = marker.localizacao.pais.slug;
        var pos = new google.maps.LatLng(marker.localizacao.cordenadas.lat, marker.localizacao.cordenadas.lng);

        // marcadores personalizados
        var image_ponto = "http://i.imgur.com/q3FIwSJ.png";
        var image_loja = "http://i.imgur.com/ophJkM1.png";
        var icons = {
            loja: {
                icon: image_loja
            },
            ponto_de_venda: {
                icon: image_ponto
            }
        };

        var locais = new google.maps.Marker({
            title: title,
            position: pos,
            icon: icons[marker.tipo.slug].icon,
            animation: google.maps.Animation.DROP,
            map: map,
        });
    }


    // active map
    $(window).load(function() {
        initMap();
    });

});