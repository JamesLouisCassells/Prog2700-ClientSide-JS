// IIFE
console.log("SCRIPT LOADED ✅", new Date().toISOString());
(() => {
    //creating icon variables ~~ mapping file numbers to a function with object of size, anchor, url thats tied to a variable
    const p_planeIcons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29].map(p_num => 
    L.icon({
        iconUrl: `images/fish${p_num}.png`,
        iconSize: [94, 40],
        iconAnchor: [47, 20]
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
        .bindPopup('Home for JLAC');
    
    const api_url = "https://prog2700.onrender.com/opensky";
    const refreshInterval = 7000; // 7 seconds in milliseconds
    let p_flightsLayer = null;// holds the current geoJSON layer

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const json = await response.json();
            console.log(json);
            const p_canadian = getCanadianFlights(json)
            const p_geo = geoJsonConvertor(p_canadian);
             
            // remove old layer (if it exists)
            if (p_flightsLayer) {
                map.removeLayer(p_flightsLayer);
            }

            p_flightsLayer = L.geoJSON(p_geo, {
                    pointToLayer: function(p_feature, p_latlng) {
                        const p_props = p_feature.properties //shortcut to use those properties later
                        const p_heading = Number(p_props.Heading) || 0; //this is the heading information pulled from the original json
                        const p_offset = 90;
                        const p_angle = Number.isFinite(p_heading) 
                            ? p_heading + p_offset //ternary operator shortcut. if its a real number (not null, undefined, NaN, Infinity) then its 90 
                            : 0; //else the angle is 0

                    // pick a fish PER feature (icon diversity)
                    const p_randomIndex = Math.floor(Math.random() * p_planeIcons.length);
                    const p_randomIcon = p_planeIcons[p_randomIndex];

                    return L.marker(p_latlng, { 
                        icon: p_randomIcon,
                        rotationAngle: p_angle,
                        rotationOrigin: "center center"
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
                    // console.log(json);
            
            } catch (error) {
                console.error("Error fetching data:", error);
                // Implement retry logic or stop refreshing if needed
            } finally {
                // Schedule the next call after the current one completes
                setTimeout(() => fetchData(url), refreshInterval); //  //now refreshes every 7 seconds
            }
        }

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

fetchData(api_url);
})();