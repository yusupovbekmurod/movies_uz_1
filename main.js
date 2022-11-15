"use strict";

movies.splice(100);

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
    language: movies.language,
  };
});

//-----------------------------NORMALIZE ALL MOVIES ------------//

//----------------------------- RENDER ALL MOVIES function ------------//

function renderAllMovies() {
  allMovies.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
    
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
         <a href="${el.link}" target="_blank" class="btn btn-danger m-2">YouTube</a>
         <button class="btn btn-primary m-2" data-read="${el.id}">Read More...</button>
         <button class="btn btn-warning m-2" data-add="${el.id}">BookMark</button>
      </div>
  
    </div>
 
    `
    );

    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();

//============================ FIND MOVIES ======== //

const findFilm = (regexp, rating = 0, category) => {
  if (category === "All") {
    return allMovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= rating;
    });
  }

  return allMovies.filter((film) => {
    return (
      film.title.match(regexp) &&
      film.rating >= rating &&
      film.category.includes(category)
    );
  });
};

//=========== FIND FILMS LISTENER ======

$("#submitForm").addEventListener("submit", () => {
  $(
    ".wrapper"
  ).innerHTML = `<div class='d-flex justify-content-center w-100'><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;

  const searchValue = $("#filmName").value;
  const filmRating = $("#filmRating").value;
  const filmCategory = $("#category").value;

  const regexp = new RegExp(searchValue, "gi");

  const searchResult = findFilm(regexp, filmRating, filmCategory);

  setTimeout(() => {
    if (searchResult.length > 0) {
      searchResultsRender(searchResult);

      $(".card-res").classList.remove("d-none");

      $(".card-res").style.displey = "block";

      $(
        "#res"
      ).innerHTML = `<strong> ${searchResult.length}</strong> ta ma'lumot topildi`;

      if (searchValue.length === 0) {
      }
    } else {
      $(".card-res").classList.add("d-none");
      $(
        ".wrapper"
      ).innerHTML = `<h1 class='text-center text-danger'>Ma'lumot topilmadi</h1>`;
    }
  }, 2000);
});

function searchResultsRender(data = []) {
  $(".wrapper").innerHTML = " ";

  data.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
    
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
          <a href="${el.link}" target="_blank" class="btn btn-danger m-2">YouTube</a>
         <button class="btn btn-primary m-2" data-read="${el.id}">Read More...</button>
         <button class="btn btn-warning m-2" data-add="${el.id}">BookMark</button>
      </div>
  
    </div>
 
    `
    );

    $(".wrapper").appendChild(card);
  });
}

//============ DYNAMIC CATEGORY ==================

const dynamicCategory = () => {
  let category = [];

  allMovies.forEach((e) => {
    e.category.forEach((el) => {
      if (!category.includes(el)) {
        category.push(el);
      }
    });
  });

  category.sort();
  category.unshift("All");
  category.forEach((el) => {
    const option = createElement("option", "item-option", el);
    $("#category").appendChild(option);
  });
};

dynamicCategory();

// ================ show modal ==========

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    const idMovie = e.target.getAttribute("data-read");
    console.log(idMovie);
    showModal(idMovie);
    $(".modal-window").classList.remove("modal-hide");
  }
});

function showModal(ID) {
  const filmItem = allMovies.filter((e) => {
    return e.id == ID;
  });

  filmItem.forEach((e) => {
    const row = createElement(
      "div",
      "row",
      `
  <div class="col-md-4">
                    <img src="${e.minImg}" alt="${e.title}" class="img-fluid"/>
                  </div>
                  <div class="col-md-6">
                    <h4 class="text-primary">${e.title}</h4>
                    <ul class="list-group">
                      <li class="list-group-item">Rating: ${e.rating}</li>
                      <li class="list-group-item">Year: ${e.year}</li>
                      <li class="list-group-item">Runtime: ${e.time}</li>
                      <li class="list-group-item">Category: ${e.category}</li>
                      <li class="list-group-item">Language: ${e.language}</li>
                    </ul>
                  </div>
                  <div class="col-md-12">
                    <h4 class="text-danger">
                    ${e.title}
                     </h4>
                     <p class="text-muted">
                      ${e.summary}
                     </p>
                  </div>
  `
    );
    $(".modal-content").appendChild(row);
  });
}

$("#close").addEventListener("click", () => {
  $(".modal-window").classList.add("modal-hide");
  $(".modal-content").innerHTML = "";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-window")) {
    $("#close").classList.toggle("animate");
  }
});

// ========= show modal end ==============

// ================ BOOKMARK =============

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-warning")) {
    const idMovie = e.target.getAttribute("data-add");
    addBookmark(idMovie);
  }
});
const bookmark = [];

function addBookmark(ID) {
  const filmItem = allMovies.filter((e) => {
    return e.id == ID;
  });
  if (!bookmark.includes(filmItem[0])) {
    bookmark.push(filmItem[0]);
  } else {
    alert("avval qo'shilgan");
  }

  localStorage.setItem("bookmark", JSON.stringify(bookmark));
}
