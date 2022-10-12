    const carousel = document.querySelector('.carousel')
    const items = carousel.querySelectorAll(".carousel__item");
    const buttons = carousel.querySelectorAll(".carousel__button");
  
/*
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {

        items.forEach(item =>
          item.classList.remove("carousel__item--selected")
        );
        buttons.forEach(button =>
          button.classList.remove("carousel__button--selected")
        );
        items[i].classList.add("carousel__item--selected");
        e.target.classList.add("carousel__button--selected")

        })
        
    }
*/

  
    // Select the first item on page load
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");


    let currentNumber = 0;

    setInterval(() => {
        items.forEach(item =>{
            item.classList.remove("carousel__item--selected")
            item.classList.remove("carousel__item_right")
            item.classList.remove("carousel__item_left")
        })
          buttons.forEach(button =>
            button.classList.remove("carousel__button--selected")
          )
          items[currentNumber].classList.add("carousel__item--selected");
          items[currentNumber].classList.add("carousel__item_right");
          buttons[currentNumber].classList.add("carousel__button--selected")
            
            setTimeout(() => {
                items[currentNumber].classList.add("carousel__item_left");
                currentNumber++;
                if(currentNumber === 3){
                    currentNumber = 0
                }
            },4000)
           

    },5000)
    

  
    
    let executed = false;
//kaldt i showFilms så vi kan vente på at alle bliver loaded ind i filen
    function initialisePosters(){
      

      //sørger for at funktion kun bliver kaldt en gang
      
      if(executed){
        return
      }
      executed = true


        const carouselContentImg = document.querySelectorAll('.carousel_content_img')
        const carouselContent = document.querySelectorAll('.carousel_content')

    
   
        //Shuffle the posters
        const shuffledPosters = posters.sort((a, b) => 0.5 - Math.random());
        
        for (let i = 0; i < shuffledPosters.length; i++) {
          const img = document.createElement('img')
          img.src = shuffledPosters[i].poster
          carouselContentImg[i].appendChild(img)
          
          const div = document.createElement('div')
          div.classList.add('carousel_text')
          const h1 = document.createElement('h1')
          h1.innerHTML = shuffledPosters[i].title
          div.appendChild(h1)
          const button = document.createElement('button')
          button.innerHTML = 'Buy Ticket'
          div.appendChild(button)
          carouselContent[i].appendChild(div)
          
          /*
          const shadowDiv = document.createElement('div')
          div.classList.add('carousel_content_shadow')
          carouselContent[i].appendChild(shadowDiv) */
        }
      
      
    }

