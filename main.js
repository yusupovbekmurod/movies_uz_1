"use strict";

movies.splice(50);

//-----------------------------NORMALIZE ALL MOVIES ------------//

const allMovies = movies.map((movies) => {
  return {
    title: movies.title,
    year: movies.year,
    category: movies.categories,
    id: movies.imdbId,
    time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
    summary: movies.summary,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    maxImg: movies.bigThumbnail,
    minImg: movies.smallThumbnail,
    rating: movies.imdbRating,
    language:movies.language
  };
});
console.log(allMovies);

//-----------------------------NORMALIZE ALL MOVIES ------------//

//----------------------------- RENDER ALL MOVIES function ------------//

function renderAllMovies() {
  allMovies.forEach((el) => {
    const card =createElement("div", 'card shadow-lg',`
    
    <img src="${el.minImg}" class="card-img-top" alt="${el.title}">
    <div class="card-body">
      <h4 class="card-title">${el.title}</h4>
      <ul class="list-unstyled">
        <li><strong>Year: ${el.year}</strong></li>
        <li><strong>Language: ${el.language} </strong></li>
        <li><strong>Runtime: ${el.time}</strong></li>
        <li><strong>Category: ${el.category}</strong></li>
        <li><strong>Rating: ${el.rating}</strong></li>
      </ul>
      <div class="social d-flex">
         <button class="btn btn-danger m-2">YouTube</button>
      <button class="btn btn-primary m-2">BookMark</button>
      <button class="btn btn-warning m-2">Read More...</button>
      </div>
  
    </div>
 
    `);
    
     ;

    $('.wrapper').appendChild(card)
  });
  
}
renderAllMovies()

