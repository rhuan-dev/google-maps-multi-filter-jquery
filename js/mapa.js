jQuery.noConflict();
jQuery(document).ready(function ($) {
    /**
     * Função inicializar mapa
     */
    function initMap() {
        // localização inicial
        var myLatlng = new google.maps.LatLng(-16.691079, -49.276891);

        // opções mapa inicial
        var mapOptions = {
            zoom: 13, // zoom inicial mapa
            center: myLatlng, // localização inicial
            mapTypeId: google.maps.MapTypeId.ROADMAP, // tipo de mapa
            mapTypeControl: false,  // desativa seleção de tipo de mapas
            // draggable: false,   // desativa drag
            scrollwheel: false, // desativa scroll zoom
        };

        // registra mapa na div #mapa como variável map
        map = new google.maps.Map(document.getElementById("mapgoogle"), mapOptions);

        // Extrai informações do locais.json para criar marcadores
        $.getJSON('stores.json', function (stores, textStatus) {
            // loop para criar marcadores no mapa usando
            // função addMarker()
            $.each(stores, function (i, store) {
                addMarker(store);
            });
        });
    }


    /**
     * Função para registro de marcadores
     */
    function addMarker(markerinfo) {
        // titulo marcador
        var title = markerinfo.name;
        if (title === null) { title = ''; }

        // endereco completo marcador
        var address = markerinfo.location.full_address;
        if (address === null) { address = ''; }

        // telefone marcador
        var phone = markerinfo.phone;
        if (phone === null) { phone = ''; }

        // posição lat e lng do marcador
        var position = new google.maps.LatLng(markerinfo.location.coordinates.lat, markerinfo.location.coordinates.lng);

        // imagens de marcadores personalizados
        var image_point = "http://i.imgur.com/q3FIwSJ.png";
        var image_store = "http://i.imgur.com/ophJkM1.png";

        // marcadores personalizados para cada tipo de local
        var icons = {
            loja: {
                icon: image_store
            },
            ponto_de_venda: {
                icon: image_point
            }
        };

        // registro de marcadores
        var marker = new google.maps.Marker({
            title: title, // titulo marcador
            position: position, // posicao marcador
            icon: icons[markerinfo.type.slug].icon, // usa icone certo para cada tipo de marcador
            animation: google.maps.Animation.DROP, // animação drop marcador
            map: map, // registra marcador na variável map
        });

        // registro de conteúdo na caixa de informações
        // do marcador
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="title-map">' + title + '</div>' + '<div class="endereco">' + address + '</div>' + '<div class="telefone-map">' + phone + '</div>'
        });

        // exibe marcador quando clicado
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        // Exibe marcador quando hover
        // marker.addListener('mouseover', function() {
        //     infowindow.open(map, marker);
        // });
        // marker.addListener('mouseout', function() {
        //     infowindow.close();
        // });

    }

    // filter country
    function filterCountry(country) {

    }

    // init map on load page
    $(window).load(function () {
        initMap();
    });

});