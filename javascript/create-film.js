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

   
    let data = fetchDataByUrl(
        "http://www.omdbapi.com/?t=" 
        + searchFilmInput.value + 
        "&apikey=" + API_KEY
        )
        .then (data => {
            

            let imageElement = document.createElement('img');
            imageElement.setAttribute("src", data.Poster)
            

            movieContainer.replaceChildren(imageElement);

            let movieBody = {
                "title": data.Title
                /*,
                "genre":"Komedie",
                "minimumAge": "12",
                "lengthInMinutes":"140",
                "description": "dfsdfsdfsdfsdfsdf"*/
            }
            console.log(movieBody)
            console.log(movieBody.title)

            imageElement.addEventListener("click", e => {
                fetch('http://localhost:8080/api/film/add-film?title=hej', {
                    Method: 'GET',
                    Headers: {
                      Accept: 'application.json',
                      'Content-Type': 'application/json'
                    },
                    //Body: movieBody.title,
                    Cache: 'default'
                  })

            })
            
        })
        
        
}
function updateView(data) {
    
    
    



}