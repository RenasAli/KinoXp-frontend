
var posters = []




function getAllFilmsByDate(date){

    const container = document.querySelector(".filmContainer")

    container.replaceChildren()


fetchDataByUrl("http://localhost:8080/filmShowingsByDate/" + date).then(data => {

    console.log(data)
   /* for (let i = 0; i < data.length; i++) {
        
        
    }*/

})
}


getAllFilmsByDate(01-02-2020)