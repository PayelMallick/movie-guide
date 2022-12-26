//Initial References
const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const downloadBtn = document.getElementById("download-btn");
const result = document.getElementById("result");
const backgroundRef = document.getElementById("body-container");

setDefaultBackground();

//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  //If input field is empty
  if (movieName.length <= 0) {
    movieNameRef.placeholder = "Please Enter A Movie Name";
    result.hidden = true;
  }
  //If input field is NOT empty
  else {
    result.hidden = false;
    movieNameRef.placeholder = "Enter movie name here...";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          backgroundRef.style.background = `url(${data.Poster}) no-repeat`;
          backgroundRef.style.backgroundSize = `100vw`;
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="img/star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            <button ><a href="${
              data.Poster
            }" target="_blank"</a>Download Poster</button>
            
        `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
          setDefaultBackground();
        }
      })
      //If error occurs
      .catch(() => {
        setDefaultBackground();
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

// Execute a function when the user presses a key on the keyboard
movieNameRef.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
  }
});

//TODO: Change to Arrow function
function setDefaultBackground() {
  backgroundRef.style.background = `linear-gradient(#36454F 50%, #FFE5B4 50%)`;
}
