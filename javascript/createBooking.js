



let filmshowingId = null

function createBookingPage(data){
    
    filmshowingId = data.filmShowingId;
    
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
    title.setAttribute('class', 'film_title')
    title.innerHTML = data.film.title
    filmBookingContainer_infoText.appendChild(title)

    const filler = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler)

    const description = document.createElement('p')
    description.setAttribute('class', 'film_description')
    description.innerHTML = 'Description: ' + data.film.description
    filmBookingContainer_infoText.appendChild(description)
    
    const filler2 = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler2)

    const date = document.createElement('p')
    date.innerHTML = 'Date: ' + data.date
    filmBookingContainer_infoText.appendChild(date)

    /*
    const room = document.createElement('p')
    description.innerHTML = data.film.room
    filmBookingContainer_infoText.appendChild(room)
    */
    console.log(data)
    const genre = document.createElement('p')
    genre.innerHTML = 'Genre: ' + data.film.genre
    filmBookingContainer_infoText.appendChild(genre)

    const actor = document.createElement('p')
    actor.innerHTML = 'Actors: ' + data.film.actors
    filmBookingContainer_infoText.appendChild(actor)
    
    const rated = document.createElement('p')
    rated.innerHTML = 'Rating: ' + data.film.rated
    filmBookingContainer_infoText.appendChild(rated)
    
    const length = document.createElement('p')
    length.innerHTML = 'Length: ' + data.film.lengthInMinutes
    filmBookingContainer_infoText.appendChild(length)
    
    
    const time = document.createElement('p')
    time.innerHTML = 'The ' + data.room.name + ' room at ' +  data.time
    filmBookingContainer_infoText.appendChild(time)


    getSeats(data)

    
}
let chosenSeats = []
let seatsList = []
function getSeats(data){
    let room = data.room
    const bookingContainer = document.querySelector('.filmBookingContainer_booking')
    
    fetchDataByUrl(baseURL + 'api/booking/byFilmShowingId/' + data.filmShowingId).then(bookedSeats => {
        

        for (let j = 0; j < bookedSeats.length; j++) {
        for (let i = 0; i < bookedSeats[j].seats.length; i++) {
            seatsList.push(bookedSeats[j].seats[i].id)
        }
    }
    
   const seatsContainer = document.querySelector('.seatsContainer')

   //reseter lige containeren
   seatsContainer.innerHTML = ''

    for (let i = 0; i < room.rows.length; i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        seatsContainer.appendChild(row)

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



    const showcase = document.querySelector('.showcase')
    
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



          //reseter lige listerne
          chosenSeats = []
          seatsList = []
          
}






function postCustomerAndBooking(){
    const inputEmailCustomer = document.getElementById('inputEmailCustomer')
    const inputNameCustomer = document.getElementById('inputNameCustomer')
    if(inputEmailCustomer.value === "" || inputNameCustomer.value === ""){
        alert("You have not entered email or/and name")
        return
    }
    if(chosenSeats.length === 0){
        alert("You have not reserved anything")
        return
    }
    
    fetchDataByUrl(baseURL + 'api/customer/' + inputEmailCustomer.value).then(data => {
        //hvis customer findes
        addBooking(inputEmailCustomer.value)

        









    }).catch(error => {
        //hvis customer ikke finder
        addCustomer(inputEmailCustomer.value,inputNameCustomer.value)
        
        setTimeout(() => {
            addBooking(inputEmailCustomer.value)
        },3000)


        refreshFrontPage()

    })

    
    

}



const reserveBookingButton = document.getElementById('reserveBookingButton')

reserveBookingButton.addEventListener('click', postCustomerAndBooking)




function addCustomer(email, firstname){

    let request = new XMLHttpRequest();
    request.open("POST", baseURL + "api/customer/add")

    request.setRequestHeader("Accept", "application/json");

    // UTF-08 ER MEGA VIGTIG HVIS DET SKAL VIRKE!!!!!!!!!!!!!
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
      
    
    let customerData = `{
        "ferstName": ${JSON.stringify(firstname)},
        "email": ${JSON.stringify(email)}
        }`;
        
    
    
    request.send(customerData);
        

    
    
}




function addBooking(email){

    let request = new XMLHttpRequest();

    let chosenSeatsString = chosenSeats[0]
    for (let i = 1; i < chosenSeats.length; i++) {
        chosenSeatsString = chosenSeatsString + ',' + chosenSeats[i]
                        
    }
                   

    request.open("POST", baseURL + "api/booking/add/" + filmshowingId + "/seats/" + chosenSeatsString + "/customer/" + email)

    request.setRequestHeader("Accept", "application/json");

    // UTF-08 ER MEGA VIGTIG HVIS DET SKAL VIRKE!!!!!!!!!!!!!
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
      
    
    let bookingData = `{
        "time": "12.00"
        }`;
        
    
    
    request.send(bookingData);
        

}
