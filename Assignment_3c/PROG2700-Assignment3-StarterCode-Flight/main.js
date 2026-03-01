// IIFE
(() => {
    //creating icon variables
    const p_planeIcons = [1,2,3,4,5].map(p_num =>
  L.icon({
    iconUrl: `images/fish${p_num}.png`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  })
);

   //create map in leaflet and tie it to the div called 'theMap'
   //Create a map layer from the api of maps
    let map = L.map('theMap').setView([
          44.65336419266691, -63.588753507345444], 4);

     L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> ' +
                 '&copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> ' +
                 '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> ' +
                 '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    //set a random marker at halifax exactly
    L.marker([44.65336419266691, -63.588753507345444]).addTo(map)
        .bindPopup('This is a sample popup.');

    //fetch the flight data
    fetch("https://prog2700.onrender.com/opensky")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        const p_canadian = getCanadianFlights(json)
        const p_geo = geoJsonConvertor(p_canadian);
        
        // pick ONE icon
        const p_randomIndex = Math.floor(Math.random() * p_planeIcons.length);
        const p_randomIcon = p_planeIcons[p_randomIndex];

        L.geoJSON(p_geo, {
            pointToLayer: function(p_feature, p_latlng) {
                const p_props = p_feature.properties //enables me to use those properties later
                const p_heading = Number(p_props.Heading) || 0; //this is the heading information pulled from the original json
                
                // ✅ pick a fish PER feature (icon diversity)
                const p_randomIndex = Math.floor(Math.random() * p_planeIcons.length);
                const p_randomIcon = p_planeIcons[p_randomIndex];

                return L.marker(p_latlng, { 
                    icon: p_randomIcon,
                    rotationAngle: Number.isFinite(p_heading) ? p_heading : 0, //icons are now facing the angle that is retrieved from the original json as heading
                    rotationOrigin: "center center",
                     })
                    .bindPopup(`
                        Callsign: ${p_props.Callsign}<br>
                        Origin: ${p_props.Origin}<br>
                        Heading: ${p_props.Heading}<br>
                        Velocity: ${p_props.Velocity}
                    `);
            }
        }).addTo(map); //layering the pointers over the map

        console.log("type", p_geo.type);// "FeatureCollection"
        console.log("number of flights:", p_geo.features.length);//number of planes from canada
        console.log("first listed flight", p_geo.features[0]); 
        });

    //function to parse the flight data for only flights departing canada (filtering for that array position)
    function getCanadianFlights(json){
        console.log("json inside function:", json);
            const states = json.states;
            const canadianOnly = states.filter(state => 
                state[2] === "Canada"
            );
            console.log(canadianOnly);
            return canadianOnly;
        }

    //function to then convert that canadian origin json into geoJson with specific data points and layers
    function geoJsonConvertor(canadianOnly) {
        const trackerItems = canadianOnly
        .filter(state => state[5] != null && state[6] != null)
        .map(state => ({
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
        //wrap that object in another object as geojson had to receive it that way for layering
        const geo_wrapper = {
            type: "FeatureCollection",
            features: trackerItems
            };
        return geo_wrapper;
    }  
})();