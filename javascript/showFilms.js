
var posters = []
let movies = []



function getAllFilmsByDate(date){

    const container = document.querySelector(".individualFilmContainer")

    container.replaceChildren()
    const frontPage = document.querySelector('.frontPage')
    frontPage.style.display = "block"

fetchDataByUrl(`${baseURL}/filmShowingsByDate/${date}`).then(data => {
   console.log(data)
    let movieNames = []
    //kører igennem data altså alle filmshowings
    for (let i = 0; i < data.length; i++) {
        let movieTimeContainer;
        //tjekker om filmen allerede er på en filmshowing
        if(!movieNames.includes(data[i].film.title)){
            //gemmer i alle de forskellige lister. Poster er til slideren.
            //Movies er til senere msåek. movienames er til denne
            let poster = {id:data[i].film.id, poster:data[i].film.poster,title:data[i].film.title}
            posters.push(poster)
            movies.push(data[i])
            movieNames.push(data[i].film.title)

            //adder alle de forskellige elementer

            const filmContainerCol = document.createElement('div')
            filmContainerCol.classList.add('filmContainerCol')
            container.append(filmContainerCol)

            const img = document.createElement('img')
            img.src = data[i].film.poster
            img.classList.add('filmPoster')
            filmContainerCol.appendChild(img)

            const filmContainerInfo = document.createElement('div')
            filmContainerInfo.classList.add('filmContainerInfo')
            filmContainerCol.appendChild(filmContainerInfo)

            const title = document.createElement('p')
            title.innerHTML = data[i].film.title
            filmContainerInfo.appendChild(title)


             //convert hours to min/hours
             let num = data[i].film.lengthInMinutes
             let hours = (num / 60);
             let rhours = Math.floor(hours);
             let minutes = (hours - rhours) * 60;
             let rminutes = Math.round(minutes);

            const playTime = document.createElement('p')
            playTime.innerHTML = "Length: " + rhours + "h" + rminutes + "m"
            filmContainerInfo.appendChild(playTime)


            //her adder vi også navnet på filmen som class name
            //så vi kan bruge den i else
            movieTimeContainer = document.createElement('div')
            movieTimeContainer.classList.add('movieTimeContainer')
            movieTimeContainer.setAttribute('data-name', data[i].film.title)
            filmContainerInfo.appendChild(movieTimeContainer)

            


        }else{
            //her tager vi fat i data-name og så adder vi tiden til den allerede eksisterende
            movieTimeContainer = document.querySelector('[data-name="' + data[i].film.title + '"]')
          

        }     
            const startTime = document.createElement('p')
            startTime.innerHTML = data[i].time
            movieTimeContainer.appendChild(startTime)   

            //her adder vi event for hvad der sker når man klikker på knappen :)
            startTime.addEventListener('click', (e) => {
                createBookingPage(data[i])
            })
        
    }
  
    initialisePosters()

    
})
}



//starter op med at finde alle filmen frem til dagen i dag
getAllFilmsByDate(formatDate(new Date()))


//new Date


//buttons
const dateButtons = document.querySelectorAll('.dateButton')
dateButtons.forEach((button, i) => {
    
    //laver en date og plusser den med i altså en dag hver dag og adder til innerhtml
    let date = new Date()
    
    date.setDate(date.getDate()+i)
    button.innerHTML = date.toDateString();
    //laver ens streng som vi kan kalde vores fetch med
    

    button.addEventListener('click', (e) => {
        
        
        getAllFilmsByDate(formatDate(date))
    })
   
})



function formatDate(date){
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    return year + "-" + month + "-" + day;
}


