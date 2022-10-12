var baseURL = 'https://gruppecicd.azurewebsites.net/'

const navHome = document.getElementById('navHome')

navHome.addEventListener('click', refreshFrontPage)

function refreshFrontPage(){
    const specificFilm = document.querySelector('.filmBookingContainer')
    specificFilm.style.display = 'none'
    getAllFilmsByDate(formatDate(new Date()))
}