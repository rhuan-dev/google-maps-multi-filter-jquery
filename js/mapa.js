jQuery.noConflict();
jQuery(document).ready(function ($) {
    // map
    var map;

    // marcadores / lojas e pontos de distribuição no mapa
    var markers = [];

    // cluster var para agrupar marcadores próximos em zoom pequeno
    var mc;
    
    // bounds / função limites do mapa
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
            // zoom: 2, // zoom inicial mapa
            maxZoom: 17, // zoom máximo
            center: myLatlng, // localização inicial
            mapTypeId: google.maps.MapTypeId.ROADMAP, // tipo de mapa
        };

        // registra mapa na div #mapa como variável mapgoogle
        map = new google.maps.Map(document.getElementById("mapgoogle"), mapOptions);

        // Extrai informações do locais.json para criar marcadores
        $.getJSON('stores.json', function (stores, textStatus) {
            // loop para criar marcadores no mapa usando
            // função addMarker()
            // para cada array em stores tem informações de um store
            $.each(stores, function (i, store) {                
                addMarker(store);
            });

            // cluster config
            // ajustes para exibição de ícone com marcadores agrupados
            var optionsCluster = {
                maxZoom: 13, // máximo zoom exibido cluster
                styles: [
                    {
                        textColor: '#ffffff', // cor texto cluster
                        url: 'plugins/clusterer/images/m1.png', // imagem fundo do cluster
                        width: 53, // largura da imagem
                        height: 52 // altura da imagem
                    }
                ]
            };        

            // suporte a clusters adicionado ao map
            // map = variável do mapa
            // markers = array de marcadores
            // optionsCluster = options do cluster configurados acima
            mc = new MarkerClusterer(map, markers, optionsCluster);
            
            // zoom para todos marcadores visíveis no ínicio
            if (bounds.f.b != 1 && bounds.f.f != -1) {
                map.fitBounds(bounds);
            }
        });
    }

    /**
     * Função para registro de marcadores
     */
    function addMarker(markerinfo) {
        // titulo do marcador
        var title = markerinfo.name;
        if (title === null) { title = ''; }

        // endereco completo do marcador, deixa em branco se não há
        var address = markerinfo.location.full_address;
        if (address === null) { address = ''; }

        // telefone do marcador, deixar em branco se não há
        var phone = markerinfo.phone;
        if (phone === null) { phone = ''; }

        // pais do marcador
        var country = markerinfo.location.country.slug;
        
        // estado do marcador
        var state = markerinfo.location.state.slug;

        // cidade do marcador
        var city = markerinfo.location.city.slug;

        // setor do marcador
        var district = markerinfo.location.district.slug;
        
        // tipo do marcador
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

        // imagem marcadores personalizados para cada tipo de local
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
     * Form filtro
     */
    $('#buscar-locais').change(function() {
        // valor pais selecionado
        // var countryValSel = $(this).val();

        var countryValSel = [
            $('#pais').val(),
            $('#estado').val(),
            $('#cidade').val(),
            $('#setor').val(),
            $('#tipo').val(),
        ];

        // limite do mapa
        bounds = new google.maps.LatLngBounds();

        for (i = 0; i < markers.length; i++) {
            // addMarker(markers[i]);
            
            var mark = markers[i];

            // If is same category or category not picked
            // if ((typeof mark.category == 'object' && mark.category.indexOf(countryValSel) >= 0) || countryValSel.length === 0) {
            if (objectsMatch(mark.category, countryValSel) || countryValSel.length === 0) {
                mark.setVisible(true);
                mc.setIgnoreHidden(true);
                bounds.extend(mark.getPosition());
            }
            // Categories don't match 
            else {
                mc.setIgnoreHidden(true);
                mark.setVisible(false);
            }
            
            // console.log(typeof mark.category);
            // console.log(mark.category);
            // console.log(mark.category.indexOf(countryValSel));
            // console.log('categorias ' + markers[i].category);
            // console.log(objectsMatch(mark.category, countryValSel));

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


    /**
     * Função verifica se objetos são identicos
     */
    function objectsMatch(roll, filterObject) {
        var match = true;
        for (var prop in filterObject) {
            if (!roll.hasOwnProperty(prop) ||
                !filterObject.hasOwnProperty(prop)) continue;
            if (roll[prop] != filterObject[prop] &&
                filterObject[prop] !== ''
            ) {
                match = false;
            }
        }
        return match;
    }

});