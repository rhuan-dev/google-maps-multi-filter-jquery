/**
 * Google Maps with Dynamic Filters
 * 
 * This script creates an interactive Google Map with markers for stores or points of interest.
 * It includes dynamic filters that allow users to filter markers based on country, state, city, district, and type.
 * 
 * Required HTML structure:
 * <div id="mapgoogle"></div>
 * <select id="pais"></select>
 * <select id="estado"></select>
 * <select id="cidade"></select>
 * <select id="setor"></select>
 * <select id="tipo"></select>
 * 
 * Make sure to include the Google Maps API and MarkerClusterer library in your HTML.
 */

(() => {
    // Configuration
    const mapJsonFile = "https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/7facb603/stores.json";
    const image_point = "https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/9cafdad0/assets/images/ponto.png";
    const image_store = "https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/9cafdad0/assets/images/loja.png";

    // Global variables
    let map;
    let markers = [];
    let mc;
    let bounds;
    let stores = [];
    let initialBounds;
    let openInfoWindow = null; // Add this line at the top of the file, with other global variables

    /**
     * Initializes the Google Map
     */
    const initMap = () => {
        const myLatlng = new google.maps.LatLng(-14.0865322, -54.505771);
        const mapOptions = {
            zoom: 4,
            maxZoom: 17,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("mapgoogle"), mapOptions);
        bounds = new google.maps.LatLngBounds();

        fetchStores();
    };

    /**
     * Fetches store data from JSON file and initializes markers
     */
    const fetchStores = async () => {
        try {
            const response = await fetch(mapJsonFile);
            stores = await response.json();
            stores.forEach(addMarker);
            createMarkerCluster();
            populateCountryFilter();
            initialBounds = bounds.clone();
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    };

    /**
     * Adds a marker to the map for a given store
     * @param {Object} markerinfo - Information about the store
     */
    const addMarker = (markerinfo) => {
        const { name, location, phone, type } = markerinfo;
        const { full_address, country, state, city, district, coordinates } = location;
        const position = new google.maps.LatLng(coordinates.lat, coordinates.lng);

        const marker = new google.maps.Marker({
            title: name || "",
            position,
            icon: type.slug === 'loja' ? image_store : image_point,
            animation: google.maps.Animation.DROP,
            map,
            category: [country.slug, state.slug, city.slug, district.slug, type.slug]
        });

        const infowindowContent = `
            <div class="custom-infowindow">
                <h3>${name || ""}</h3>
                <p><strong>Endereço:</strong> ${full_address || ""}</p>
                <p><strong>Telefone:</strong> ${phone || ""}</p>
                <p><strong>Tipo:</strong> ${type.name || ""}</p>
                <button class="directions-button" onclick="getDirections(${coordinates.lat}, ${coordinates.lng})">Obter Direções</button>
            </div>
        `;

        const infowindow = new google.maps.InfoWindow({
            content: infowindowContent,
            maxWidth: 300
        });

        marker.addListener("click", () => {
            if (openInfoWindow) {
                openInfoWindow.close();
            }
            infowindow.open(map, marker);
            openInfoWindow = infowindow;
        });

        markers.push(marker);
        bounds.extend(position);
    };

    /**
     * Creates a marker cluster for better performance with many markers
     */
    const createMarkerCluster = () => {
        const optionsCluster = {
            maxZoom: 13,
            styles: [{
                textColor: "#ffffff",
                url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
                width: 53,
                height: 52
            }]
        };

        mc = new MarkerClusterer(map, markers, optionsCluster);
        map.fitBounds(bounds);
    };

    /**
     * Populates the country filter with available countries
     */
    const populateCountryFilter = () => {
        populateFilter('pais', stores.map(store => store.location.country));
    };

    /**
     * Populates dependent filters based on the selection of parent filters
     */
    const populateDependentFilters = () => {
        const selectedCountry = document.getElementById('pais').value;
        const selectedState = document.getElementById('estado').value;
        const selectedCity = document.getElementById('cidade').value;
        const selectedDistrict = document.getElementById('setor').value;

        let filteredStores = stores;

        if (selectedCountry) {
            filteredStores = filteredStores.filter(store => store.location.country.slug === selectedCountry);
            populateFilter('estado', filteredStores.map(store => store.location.state));
        } else {
            resetFilter('estado');
        }

        if (selectedState) {
            filteredStores = filteredStores.filter(store => store.location.state.slug === selectedState);
            populateFilter('cidade', filteredStores.map(store => store.location.city));
        } else {
            resetFilter('cidade');
        }

        if (selectedCity) {
            filteredStores = filteredStores.filter(store => store.location.city.slug === selectedCity);
            populateFilter('setor', filteredStores.map(store => store.location.district));
        } else {
            resetFilter('setor');
        }

        if (selectedDistrict) {
            filteredStores = filteredStores.filter(store => store.location.district.slug === selectedDistrict);
        } else {
            resetFilter('tipo');
        }

        populateFilter('tipo', filteredStores.map(store => store.type));
    };

    /**
     * Populates a specific filter with options
     * @param {string} filterId - ID of the filter element
     * @param {Array} items - Array of items to populate the filter
     */
    const populateFilter = (filterId, items) => {
        const select = document.getElementById(filterId);
        const currentValue = select.value;
        select.innerHTML = '<option value="">Selecione</option>';
        
        const uniqueItems = [...new Map(items.map(item => [item.slug, item])).values()];
        
        uniqueItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.slug;
            option.textContent = item.name;
            select.appendChild(option);
        });

        if (uniqueItems.some(item => item.slug === currentValue)) {
            select.value = currentValue;
        }
    };

    /**
     * Resets a specific filter to its default state
     * @param {string} filterId - ID of the filter element
     */
    const resetFilter = (filterId) => {
        const select = document.getElementById(filterId);
        select.innerHTML = '<option value="">Selecione</option>';
    };

    /**
     * Filters map locations based on selected filter values
     */
    const filterLocations = () => {
        const filters = ['pais', 'estado', 'cidade', 'setor', 'tipo'].map(id => document.getElementById(id).value);
        bounds = new google.maps.LatLngBounds();

        let visibleMarkers = 0;
        markers.forEach(marker => {
            const isVisible = filters.every((filter, index) => !filter || marker.category[index] === filter);
            marker.setVisible(isVisible);
            if (isVisible) {
                bounds.extend(marker.getPosition());
                visibleMarkers++;
            }
        });

        if (visibleMarkers > 0) {
            map.fitBounds(bounds);
        } else {
            map.fitBounds(initialBounds);
        }
        
        if (mc) mc.repaint();
    };

    /**
     * Attaches event listeners to filter elements
     */
    const attachEventListeners = () => {
        ['pais', 'estado', 'cidade', 'setor'].forEach(id => {
            document.getElementById(id).addEventListener("change", (event) => {
                if (event.target.value === "") {
                    resetChildFilters(id);
                }
                populateDependentFilters();
                filterLocations();
            });
        });

        document.getElementById('tipo').addEventListener("change", filterLocations);
    };

    /**
     * Resets child filters when a parent filter is set to blank
     * @param {string} parentId - ID of the parent filter
     */
    const resetChildFilters = (parentId) => {
        const filterOrder = ['pais', 'estado', 'cidade', 'setor', 'tipo'];
        const startIndex = filterOrder.indexOf(parentId) + 1;
        for (let i = startIndex; i < filterOrder.length; i++) {
            resetFilter(filterOrder[i]);
        }
    };

    /**
     * Initializes the map and attaches event listeners
     */
    const loadMap = () => {
        initMap();
        attachEventListeners();
        addInfoWindowStyles(); // Add this line
    };

    // Load the map when the window has finished loading
    window.addEventListener("load", loadMap);

    // Add this function at the end of the file, before the IIFE closing
    const addInfoWindowStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .custom-infowindow {
                font-family: Arial, sans-serif;
                padding: 10px;
            }
            .custom-infowindow h3 {
                margin: 0 0 10px;
                color: #333;
                font-size: 18px;
            }
            .custom-infowindow p {
                margin: 5px 0;
                color: #666;
                font-size: 14px;
            }
            .custom-infowindow strong {
                color: #444;
            }
            .directions-button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 14px;
                margin-top: 10px;
                cursor: pointer;
                border-radius: 4px;
            }
            .directions-button:hover {
                background-color: #45a049;
            }
        `;
        document.head.appendChild(style);
    };

    // Add this function to handle getting directions
    const getDirections = (lat, lng) => {
        const destination = `${lat},${lng}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(url, '_blank');
    };

    // Make getDirections function globally accessible
    window.getDirections = getDirections;
})();