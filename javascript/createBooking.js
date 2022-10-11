




function createBookingPage(data){
    console.log(data)
    const container = document.querySelector('.filmBookingContainer_info')
    //container.replaceChildren()

    console.log(data)
    const frontPage = document.querySelector('.frontPage')
    frontPage.style.display = "none"

    const bookingPage = document.querySelector('.filmBookingContainer')
    bookingPage.style.display = "block"

    
    const filmBookingContainer_info = document.createElement('div')
    filmBookingContainer_info.classList.add('filmBookingContainer_info')
    bookingPage.appendChild(filmBookingContainer_info)

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
    
}



$(document).ready(function(){
    $('#qty_input').prop('disabled', true);
    $('#plus-btn').click(function(){
    	$('#qty_input').val(parseInt($('#qty_input').val()) + 1 );
    	    });
        $('#minus-btn').click(function(){
    	$('#qty_input').val(parseInt($('#qty_input').val()) - 1 );
    	if ($('#qty_input').val() == 0) {
			$('#qty_input').val(1);
		}

    	    });
 });