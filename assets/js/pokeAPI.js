const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=00";

const getAPI = (api) => {
  return fetch(api)
    .then((response) => response.json()) 
    .then((json) => {
      fillData(json.results), pagination(json.previous, json.next);
    })
    .catch((error) => {
      console.log("Error in the API :", error);
    });
};

const fillData = (data) => {
  let html = "";

  data.forEach((p) => {
    let url = p.url;
    fetch(url)
    .then((response) => response.json())
    .then((json) =>{


    let image = json.sprites.other.dream_world.front_default;
    html += '<div class="col">';
    html += '<div class="card h-100">';
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${p.name}</h5>`;
    html += `<h5 class="card-title">Altura: ${json.height}</h5>`;
    html += `<h5 class="card-title">Peso: ${json.weight}</h5>`;
    html += `<img src="${image}" class="card-img-top" alt="...">`;
    html += "</div>";
    html += "</div>";
    html += "</div>";
    document.getElementById("characters").innerHTML = html;
  })
  .catch((error)=> {
    console.log("Error in the API: ", error);
  });
  });
};


const pagination = (previous,next) => {
  let html = "";

  html += `<li class="page-item ${
    previous == null ? "disabled" : ""
  }"><a  class="btn btn-secondary" onclick="getAPI('${previous}')">Previous</a></li>`;

  html += `<li class="page-item ${
    next == null ? "disabled" : ""
  }"><a  class="btn btn-secondary" onclick="getAPI('${next}')">Next</a></li>`;

  html += `<p>Pokéapi: una API de Pokémon para desarrolladores, creada específicamente para informar a todos los jugadores de Pokémon. Es, de lejos, la mayor base de datos gratuita sobre Pokémon, y puedes utilizarla tanto y como quieras.</p>`;

  document.getElementById("pagination").innerHTML= html;
};

getAPI(API);

