const createFilmShowingButton = document.getElementById('createFilmShowingModalButton')

async function fetchDataByUrl(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

addEventListenerToCreateFilmShowing()

//adder event så listen af film bliver loadet ind og gemt i et array

function addEventListenerToCreateFilmShowing(){

createFilmShowingButton.addEventListener('click', addDataToCreateFilmContainer =  (e) => {
    const films = [
        
    ]
    const filmContainer = document.querySelector('.createFilmShowingContainer')
    fetchDataByUrl('http://localhost:8080/api/film/all').then(data =>{
        console.log(data)
        // for at tømme containeren inden vi adder alle elementerne
        filmContainer.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('div')
            card.classList.add('createFilmShowingCard')
            filmContainer.appendChild(card)
            const imgPoster = document.createElement('img')
            imgPoster.src = data[i].poster
            imgPoster.style.width = "100%"
            card.appendChild(imgPoster)

            const film = {id:data[i].id, title:data[i].title}
            films.push(film)
            imgPoster.addEventListener('click', (e) => {
                const titleInput = document.getElementById('createFilmName')
                titleInput.setAttribute('value',data[i].title)
            })
        }

        
    })
})

}