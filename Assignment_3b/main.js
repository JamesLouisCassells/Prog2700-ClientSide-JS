// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        console.log(json);
        console.log(json._embedded.episodes[0]);

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...
    function getGuntherCount(json){
        const episodes = json._embedded.episodes //store the episodes array as a variable thats returned from the api object
        const guntherEpisodes = episodes.filter(episode => //for every episode in the episodes array
            episode.summary && episode.summary.includes("Gunther") //there has to be a summary (null will fail) AND "Gunther" mentioned
        );
       
        return guntherEpisodes.length //return the count of that amount i.e length

    }

    function getTotalRuntimeMinutes(json){
        const episodes = json._embedded.episodes // save episode location
        const minutes = episodes.reduce((total, episode)  => //reduce, accumulator is total, episode is the episode
            total + episode.runtime, 0);// keep track of total minutes through total as accumulator, 0 index
        return minutes;
    }

    function getTotalEpisodesInYear(json, input){
        const episodes = json._embedded.episodes
        const yearlyEpisodes = episodes.filter((episode)  => //filter through each episode
            episode.airdate.startsWith(input)); //go to airdate location, find the years that start with whatever string is input ie "2000"
        return yearlyEpisodes.length; //return the length of that array
    }

    function getFemaleCastMembers(json){
        const cast = json._embedded.cast //this time the absolute path goes through cast
        const females = cast.filter(castmember => castmember.person.gender === "Female") //create a variable for females that filters for exact match to "Female"
        .map(castmember => castmember.person.name) //then map positive matches to females array that map creates

        return females;
    }


    function getEpisodeTitles(json, input) {
        const episodes = json._embedded.episodes 
        const ursulaEpisodes = episodes.filter(episode => //go through episodes
            episode.summary.includes(input)) //filter for any summary that includes whatever the input is
            .map(episode => episode.name ) //populate a new array with that input
        return ursulaEpisodes
    }

    function getCastMembersOver55(json){
        const cast = json._embedded.cast //this time the absolute path goes through cast
        const olderCast = cast.filter(castmember => {
            if (!castmember.person.birthday) return false; //if theres no listed birthday then break
            const age = new Date().getFullYear() - new Date(castmember.person.birthday).getFullYear(); //calculates the exact breakpoint for 55 years from the moment Bill clicks this (not hard coded)
            return age > 55; //if the person was over 55 theyll be mapped to oldercast and their name returned in an array
        })
        .map(castmember => castmember.person.name) 
        return olderCast;
    }
    
    function getTotalRuntimeMinutesExcludingSeasonSix(json){
        const episodes = json._embedded.episodes; // save episode location
        const runTimeMinusSix = episodes
            .filter(episode => episode.season !== 6)
            .reduce((total, episode) => total + episode.runtime, 0);
        return runTimeMinusSix;
    }

    function getFirstFourSeasons(){
        return 0;
    }

    function getEpisodeTallyBySeason() {
        return 0;
    }

    function capitalizeTheFriends(){
        return 0;
    }
})();

