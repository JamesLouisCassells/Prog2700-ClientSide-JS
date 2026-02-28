// IIFE
(() => {

    fetch("https://prog2700.onrender.com/opensky")
    .then((response) => response.json())
    .then((json) => {

        console.log(json);
        const p_canadian = getCanadianFlights(json)
        const p_geo = geoJsonConvertor(p_canadian);
        
        console.log(p_geo.type);// "FeatureCollection"
        console.log(p_geo.features.length);//number of planes from canada
        console.log(p_geo.features[0]); //

        });

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([
          44.65336419266691, -63.588753507345444], 4);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

    L.marker([44.65336419266691, -63.588753507345444]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
        ;
    function getCanadianFlights(json){
        console.log("json inside function:", json);
            const states = json.states;
            const canadianOnly = states.filter(state => 
                state[2] === "Canada"
            );
            console.log(canadianOnly);
            return canadianOnly;
        }

    function geoJsonConvertor(canadianOnly) {
        const trackerItems = canadianOnly.map(state => ({
            type: "Feature",
            properties: {
                Callsign: state[1],
                Origin: state[2],
                Heading: state[10],
                Velocity: state[9]
            },
            geometry: {
                type: "Point",
                coordinates: [state[5], state[6]]  // [lng, lat]
            },
            }))
        const geo_wrapper = {
            type: "FeatureCollection",
            features: trackerItems
            };
        return geo_wrapper;
    }  



})();