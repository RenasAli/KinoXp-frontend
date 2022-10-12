
const baseURL = 'https://gruppecicd.azurewebsites.net/'



function createBookingPage(data){
    

    
    //hider forsiden og viser den enkelte film
    const frontPage = document.querySelector('.frontPage')
    frontPage.style.display = "none"
    const bookingPage = document.querySelector('.filmBookingContainer')
    bookingPage.style.display = "block"

    const filmBookingContainer_info = document.querySelector('.filmBookingContainer_info')
    filmBookingContainer_info.replaceChildren()

    const img = document.createElement('img')
    img.src = data.film.poster
    filmBookingContainer_info.appendChild(img)



    const filmBookingContainer_infoText = document.createElement('div')
    filmBookingContainer_infoText.classList.add('filmBookingContainer_infoText')
    filmBookingContainer_info.appendChild(filmBookingContainer_infoText)


    //alle p tags er dem vi displayer


    const title = document.createElement('p')
    title.innerHTML = data.film.title
    filmBookingContainer_infoText.appendChild(title)

    const description = document.createElement('p')
    description.innerHTML = data.film.description
    filmBookingContainer_infoText.appendChild(description)
    
    
    const date = document.createElement('p')
    date.innerHTML = data.date
    filmBookingContainer_infoText.appendChild(date)

    /*
    const room = document.createElement('p')
    description.innerHTML = data.film.room
    filmBookingContainer_infoText.appendChild(room)
    */
    
    const genre = document.createElement('p')
    genre.innerHTML = data.film.genre
    filmBookingContainer_infoText.appendChild(genre)

    const actor = document.createElement('p')
    actor.innerHTML = data.film.actors
    filmBookingContainer_infoText.appendChild(actor)
    
    const rated = document.createElement('p')
    rated.innerHTML = data.film.rated
    filmBookingContainer_infoText.appendChild(rated)
    
    const length = document.createElement('p')
    length.innerHTML = data.film.lengthInMinutes
    filmBookingContainer_infoText.appendChild(length)
    
    
    const time = document.createElement('p')
    time.innerHTML = data.time
    filmBookingContainer_infoText.appendChild(time)


    getSeats(data)

    
}


function getSeats(data){
    let room = data.room
    const bookingContainer = document.querySelector('.filmBookingContainer_booking')
    console.log(data)
    fetchDataByUrl(baseURL + 'api/booking/byFilmShowingId/' + data.filmShowingId).then(bookedSeats => {
        let seatsList = []

        for (let j = 0; j < bookedSeats.length; j++) {
        for (let i = 0; i < bookedSeats[j].seats.length; i++) {
            seatsList.push(bookedSeats[j].seats[i].id)
        }
    }
    
    let chosenSeats = []
    for (let i = 0; i < room.rows.length; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        bookingContainer.appendChild(row)

        for (let j = 0; j < room.rows[i].seats.length; j++) {
           
            const seat = document.createElement('div')
            seat.classList.add('seat')
            if(seatsList.includes(room.rows[i].seats[j].id)){
                seat.classList.add('occupied')
            }else{
                seat.addEventListener('click', (e) => {
                    
                    if(seat.classList.contains('selected')){
                        seat.classList.remove('selected')
                        chosenSeats.splice(chosenSeats.indexOf(room.rows[i].seats[j].id,1))
                    }else{
                        chosenSeats.push(room.rows[i].seats[j].id)
                        seat.classList.add('selected')
                    }
                })
            }
            
            row.appendChild(seat)
            
           
        }
        
    }
})



    const showcase = document.createElement('ul')
    showcase.classList.add('showcase')
    showcase.innerHTML = `
     <li>
            <div class="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat occupied"></div>
            <small>Occupied</small>
          </li>
    
          `
          bookingContainer.appendChild(showcase)
}






function postCustomerAndBooking(){

}
git