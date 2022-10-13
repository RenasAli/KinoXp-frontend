


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

    /*
    const filler = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler)
    */
    const updateFilmshowingButton = document.createElement('button')
    updateFilmshowingButton.innerHTML = 'Update filmshowing'
    updateFilmshowingButton.setAttribute('data-toggle','modal')
     updateFilmshowingButton.setAttribute('data-target','#showUpdateFilmshowingModal')


    updateFilmshowingButton.addEventListener('click', () => {
      document.getElementById('inputFilmShowingPrice').value = data.price
      document.getElementById('inputFilmShowingDate').value = data.date
      document.getElementById('inputFilmShowingTime').value = data.time

   })


    const submit = document.getElementById('submitUpdateFilmshowing')

    const filler3 = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler3)


    if(isAdmin === false){
        updateFilmshowingButton.style.display = 'none'
        filler3.style.display = 'none'
        
    }else{
        //const filler = document.createElement('p')
        //filmBookingContainer_infoText.appendChild(filler)
    }



        submit.addEventListener('click', () => {
            updateFilmShowing(data)    

        })

        
     
     



    filmBookingContainer_infoText.appendChild(updateFilmshowingButton)
  

    const filmBookingContainer_admin = document.querySelector('.filmBookingContainer_admin')
    filmBookingContainer_admin.display ="block"


    const filler1 = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler1)




    const description = document.createElement('p')
    description.setAttribute('class', 'film_description')
    description.innerHTML = data.film.description
    filmBookingContainer_infoText.appendChild(description)
    
    const filler2 = document.createElement('p')
    filmBookingContainer_infoText.appendChild(filler2)
    
    const date = document.createElement('p')
    date.innerHTML = '<span class= "film_info_text_titles"> Date: </span>' + data.date
    filmBookingContainer_infoText.appendChild(date)


  

    /*
    const room = document.createElement('p')
    description.innerHTML = data.film.room
    filmBookingContainer_infoText.appendChild(room)
    */

    const actor = document.createElement('p')
    actor.innerHTML = '<span class= "film_info_text_titles"> Cast: </span>' + data.film.actors
    filmBookingContainer_infoText.appendChild(actor)
    
    const genre = document.createElement('p')
    genre.innerHTML = '<span class= "film_info_text_titles"> Genre: </span>' + data.film.genre
    filmBookingContainer_infoText.appendChild(genre)

    const rated = document.createElement('p')
    rated.innerHTML = '<span class= "film_info_text_titles"> Rated: </span>' + data.film.rated
    filmBookingContainer_infoText.appendChild(rated)
    
    const length = document.createElement('p')
    length.innerHTML = '<span class= "film_info_text_titles"> Length: </span>' + data.film.lengthInMinutes + '<span class= "film_info_text_titles2"> min</span>'
    filmBookingContainer_infoText.appendChild(length)
    
    
    const time = document.createElement('p')
    time.innerHTML = '<span class= "film_info_text_titles"> Start Time: </span>' + data.time
    filmBookingContainer_infoText.appendChild(time)

    const price = document.createElement('p')
    time.innerHTML = '<span class= "film_info_text_titles"> Price: </span>' + data.price + '<span class= "film_info_text_titles2">DKK</span>'
    filmBookingContainer_infoText.appendChild(price)

    getSeats(data)

    
}




function updateFilmShowing (filmShowing) {
    console.log(filmShowing)
    let filmShowingPriceValue =  document.getElementById('inputFilmShowingPrice').value
    let dateValue = document.getElementById('inputFilmShowingDate').value
    let filmShowingTimeValue = document.getElementById('inputFilmShowingTime').value
    console.log(baseURL + 'updateFilmShowing/' + filmShowing.filmShowingId + '/film/' + filmShowing.film.id + '/room/' + filmShowing.room.id + '?price=' + filmShowingPriceValue + '&date=' + dateValue + '&time=' + filmShowingTimeValue)
    var patchRequest = new XMLHttpRequest();
    patchRequest.open('PATCH', baseURL + 'updateFilmShowing/' + filmShowing.filmShowingId + '/film/' + filmShowing.film.id + '/room/' + filmShowing.room.id + '?price=' + filmShowingPriceValue + '&date=' + dateValue + '&time=' + filmShowingTimeValue);
    patchRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    patchRequest.setRequestHeader("Accept", "application/json");

    patchRequest.send();
   


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

    })

    refreshFrontPage()
    

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

