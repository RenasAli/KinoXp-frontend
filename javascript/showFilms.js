
var posters = []

var refreshFilmShowingContainer = () => {

const container = document.querySelector(".filmContainer")

container.replaceChildren()


fetchDataByUrl("http://localhost:8080/allFilmShowing").then(data => {
    for (let i = 0; i < data.length; i++) {
        const filmContainerCol = document.createElement('div')
        filmContainerCol.classList.add('filmContainerCol')  
        filmContainerCol.classList.add('filmContainerPosterHover')
        container.appendChild(filmContainerCol)  
        
        const filmPoster = document.createElement('img')
        filmPoster.src = data[i].film.poster
        filmPoster.classList.add('filmPoster')
        filmContainerCol.appendChild(filmPoster)

        posters.push(data[i].film.poster)

        const filmContainerInfo = document.createElement('div')
        filmContainerInfo.classList.add('filmContainerInfo')  
        filmContainerCol.appendChild(filmContainerInfo)

        const title = document.createElement('p')
        title.innerHTML = 'Title: ' + data[i].film.title
        title.style.paddingTop = '10px'
        filmContainerInfo.appendChild(title)

        const filmLength = document.createElement('p')
        filmLength.innerHTML = 'Length: ' + data[i].film.lengthInMinutes + ' min'
        filmContainerInfo.appendChild(filmLength)
    }
    
})
}


refreshFilmShowingContainer()