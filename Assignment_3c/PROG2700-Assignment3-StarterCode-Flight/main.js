// IIFE
(() => {

    fetch("https://prog2700.onrender.com/opensky")
    .then((response) => response.json())
    .then((json) => {

        console.log(json);
        getCanadianFlights(json)

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
            const regions = json.states
            canadianOnly = regions.filter(regions => 
                regions.includes("Canada") 
            );
            console.log(canadianOnly);
        }

})();