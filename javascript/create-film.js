let searchFilmInput = document.querySelector('#search-film-input');

const API_KEY = "8576545a"




let searchFilmButton = document.querySelector('#search-film-button');

let movieContainer = document.querySelector('#movie-container');

searchFilmButton.addEventListener('click', getInput);


function getInput() {

   
    fetchDataByUrl(
        "http://www.omdbapi.com/?t=" 
        + searchFilmInput.value + 
        "&apikey=" + API_KEY
        )
        .then (data => {
            
            
            let imageElement = document.createElement('img');
            imageElement.setAttribute("src", data.Poster)
            imageElement.classList.add('filmContainerPosterHover')
        

            movieContainer.replaceChildren(imageElement);

            imageElement.addEventListener("click", e => {
            
                let request = new XMLHttpRequest();
                request.open("POST", baseURL + "api/film/add-film")

                request.setRequestHeader("Accept", "application/json");
        
                // UTF-08 ER MEGA VIGTIG HVIS DET SKAL VIRKE!!!!!!!!!!!!!
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                let movieData = `{
                "title": ${JSON.stringify(data.Title)},
                "genre": ${JSON.stringify(data.Genre)},
                "rated": ${JSON.stringify(data.Rated)},
                "lengthInMinutes": ${JSON.parse(data.Runtime.substring(0, 4))},
                "description": ${JSON.stringify(data.Plot)},
                "poster": ${JSON.stringify(data.Poster)},
                "actors": ${JSON.stringify(data.Actors)}
                }`;

                
                request.send(movieData);
                

                //for at reset film i filmShowing
                
                

        

            })
            
        })
        
        
}