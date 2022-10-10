
var posters = []

var refreshFilmShowingContainer = () => {

const container = document.querySelector(".filmContainer")

container.replaceChildren()


fetchDataByUrl("http://localhost:8080/allFilmShowing").then(data => {
    
})
}


refreshFilmShowingContainer()


fetchDataByUrl("http://localhost:8080/allFilmShowing").then(data => {

})
