let searchFilmInput = document.querySelector('#search-film-input');

const API_KEY = "8576545a"




let searchFilmButton = document.querySelector('#search-film-button');

let movieContainer = document.querySelector('#movie-container');

searchFilmButton.addEventListener('click', getInput);



async function fetchDataByUrl(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

function getInput() {

    console.log(searchFilmInput.value);
    let data = fetchDataByUrl(
        "http://www.omdbapi.com/?t=" 
        + searchFilmInput.value + 
        "&apikey=" + API_KEY
        )
        .then (data => {
            console.log(data)
            console.log(data.Poster);

            let imageElement = document.createElement('img');
            imageElement.setAttribute("src", data.Poster)
            

            movieContainer.replaceChildren(imageElement);

            let movieBody = {
                "title": data.Title,
                "genre":"Komedie",
                "minimumAge": "12",
                "lengthInMinutes":"140",
                "description": "dfsdfsdfsdfsdfsdf"
            }

            imageElement.addEventListener("click", e => {
                fetch('http://localhost:8080/api/film/add-film', {
                    Method: 'POST',
                    Headers: {
                      Accept: 'application.json',
                      'Content-Type': 'application/json'
                    },
                    Body: movieBody,
                    Cache: 'default'
                  })

            })
            console.log(movieContainer);
        })
        
        
}
function updateView(data) {
    
    
    



}