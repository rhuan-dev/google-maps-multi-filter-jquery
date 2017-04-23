jQuery.noConflict();
jQuery(document).ready(function ($) {
    // map
    var map;

    // markers
    var markers = [];

    // cluster var
    var mc;
    
    // bounds
    var bounds = new google.maps.LatLngBounds();

    /**
     * Função inicializar mapa
     */
    function initMap() {
        // localização inicial
        var myLatlng = new google.maps.LatLng(
            -14.0865322, 
            -54.505771
        );

        // opções mapa inicial
        var mapOptions = {
            maxZoom: 16,
            zoom: 5, // zoom inicial mapa
            center: myLatlng, // localização inicial
            mapTypeId: google.maps.MapTypeId.ROADMAP, // tipo de mapa
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
            // cluster config
            var optionsCluster = {
                // imagePath: 'plugins/clusterer/images/m',
                maxZoom: 13,
                styles: [
                    {
                        textColor: '#ffffff',
                        url: 'plugins/clusterer/images/m1.png',
                        width: 53,
                        height: 52
                    }
                ]
            };        

            // clusters 
            mc = new MarkerClusterer(map, markers, optionsCluster);
            
            // zoom para limite de todos marcadores registrado
            // if (bounds.f.b != 1 && bounds.f.f != -1) {
            //     map.fitBounds(bounds);
            // }
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

        // pais
        var country = markerinfo.location.country.slug;
        
        // estado
        var state = markerinfo.location.state.slug;

        // cidade
        var city = markerinfo.location.city.slug;

        // setor
        var district = markerinfo.location.district.slug;
        
        // tipo
        var type = markerinfo.type.slug;

        // todas categorias em um array
        var categories = [
            country,
            state,
            city,
            district,
            type
        ];

        // posição lat e lng do marcador
        var position = new google.maps.LatLng(markerinfo.location.coordinates.lat, markerinfo.location.coordinates.lng);

        // imagens de marcadores personalizados
        var image_point = "assets/images/ponto.png";
        var image_store = "assets/images/loja.png";

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
            category: categories
        });
        
        // adiciona markers ao array
        markers.push(marker);

        // limite adicionado com posição de cada marcador
        bounds.extend(marker.position);

        // registro de conteúdo na caixa de informações
        // do marcador
        var infowindow = new google.maps.InfoWindow({
            content: '<div class="title-map">' + title + '</div>' + '<div class="endereco">' + address + '</div>' + '<div class="telefone-map">' + phone + '</div>'
        });

        // exibe marcador quando clicado
        marker.addListener('click', function () {
            // zoom no marcador
            // map.setZoom(14);

            // centraliza mapa na posição do marcador
            // map.setCenter(marker.getPosition());
            
            // abre caixa informações marcador
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

    /**
     * Pais filter
     */
    $('#pais').change(function() {
        var valSel = $(this).val();
        console.log('selecionado ' + valSel);

        // limite do mapa
        bounds = new google.maps.LatLngBounds();

        for (i = 0; i < markers.length; i++) {
            // addMarker(markers[i]);
            
            var mark = markers[i];

            // If is same category or category not picked
            if ((typeof mark.category == 'object' && mark.category.indexOf(valSel) >= 0) || valSel.length === 0) {
                mark.setVisible(true);
                bounds.extend( mark.getPosition() );
            }
            // Categories don't match 
            else {
                mark.setVisible(false);
            }
            
            console.log(markers[i].category);

            console.log('categorias ' + markers[i].category);
            console.log('posições ' + markers[i].getPosition() + '\n\n');
            
        }

        // zoom mapa aos marcadores selecionados com 
        // a categoria
        map.fitBounds(bounds);
    });

    // console.log(markers);

    // init map on load page
    $(window).load(function () {
        initMap();
    });

});