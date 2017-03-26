jQuery.noConflict();
jQuery(document).ready(function($) {
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
        }

        // registra mapa na div #mapa como variável map
        map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

        // Extrai informações do locais.json para criar marcadores
        $.getJSON('locais.json', function(locais, textStatus) {
            // loop para criar marcadores no mapa usando
            // função addMarker()
            $.each(locais, function(i, local) {
                addMarker(local);
            });
        });


    }


    /**
     * Função para registro de marcadores
     */
    function addMarker(markerinfo) {
        // titulo marcador
        var title = markerinfo.nome;
        if (title == null) {
            title = '';
        }

        // endereco completo marcador
        var endereco = markerinfo.localizacao.endereco;
        if (endereco == null) {
            endereco = '';
        }

        // telefone marcador
        var telefone = markerinfo.telefone;
        if(telefone == null) {
            telefone = ''
        }

        // posição lat e lng do marcador
        var position = new google.maps.LatLng(markerinfo.localizacao.cordenadas.lat, markerinfo.localizacao.cordenadas.lng);

        // imagens de marcadores personalizados
        var image_ponto = "http://i.imgur.com/q3FIwSJ.png";
        var image_loja = "http://i.imgur.com/ophJkM1.png";

        // marcadores personalizados para cada tipo de local
        var icons = {
            loja: {
                icon: image_loja
            },
            ponto_de_venda: {
                icon: image_ponto
            }
        };

        // registro de marcadores
        var marker = new google.maps.Marker({
            title: title, // titulo marcador
            position: position, // posicao marcador
            icon: icons[markerinfo.tipo.slug].icon, // usa icone certo para cada tipo de marcador
            animation: google.maps.Animation.DROP, // animação drop marcador
            map: map, // registra marcador na variável map
        });

        // registro de conteúdo na caixa de informações
        // do marcador
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="title-map" style="font-weight: 700;">' + title + '</div>' + '<div class="endereco">' + endereco + '</div>' + '<div class="telefone-map" style="font-weight: 700;">' + telefone + '</div>'
        });

        // exibe marcador quando clicado
        // marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        // });

        // Exibe marcador quando hover
        marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function() {
            infowindow.close();
        });

    }

    // filter country
    function filterCountry(pais) {

    }

    // init map on load page
    $(window).load(function() {
        initMap();
    });

});