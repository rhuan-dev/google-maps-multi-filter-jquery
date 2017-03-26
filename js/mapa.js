jQuery.noConflict();
jQuery(document).ready(function($) {
    /**
     * Initial Map
     */
    function initMap() {
        // localização inicial
        var myLatlng = new google.maps.LatLng(-16.691079, -49.276891);

        // opções mapa inicial
        var mapOptions = {
            zoom: 13,
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

                console.log(item);
            });
        });
    }


    /**
     * Função Adiciona marcadores função
     */
    function addMarker(markerinfos) {
        var title = markerinfos.nome;
        var pos = new google.maps.LatLng(markerinfos.localizacao.cordenadas.lat, markerinfos.localizacao.cordenadas.lng);

        // marcadores personalizados
        var image_ponto = "http://i.imgur.com/q3FIwSJ.png";
        var image_loja = "http://i.imgur.com/ophJkM1.png";

        // marcadores personalizados para cada tipo de local
        var icons = {
            // caso tipo local for loja como slug
            loja: {
                icon: image_loja
            },

            // caso tipo de local for ponto_de_venda como slug
            ponto_de_venda: {
                icon: image_ponto
            }
        };

        // registro de marcadores
        var marker = new google.maps.Marker({
            title: title,
            position: pos,
            icon: icons[markerinfos.tipo.slug].icon,
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: map,
        });

        // info window content
        var infowindow = new google.maps.InfoWindow({
            content: title
        });

        // Open and close info window
        // marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        // });
        marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function() {
            infowindow.close();
        });

    }


    $('#buscar-locais').submit(function(event) {
        event.preventDefault();
    });


    // init map on load page
    $(window).load(function() {
        initMap();
    });

});