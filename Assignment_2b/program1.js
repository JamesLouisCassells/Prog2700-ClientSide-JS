function getData() {
    fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => {
        // Data is used here
        // console.log(data[0].url);
        const url = data[0].url;
        const catpic = document.getElementById('catpic');
        catpic.innerHTML = "<img src=' " + url + " ' />" ;
    })
}

getData(); //calls the fetch function
document.getElementById("catButton").addEventListener("click", getData); 
// cat button which i needed AI to help create