// --------------- Variables --------------------

fetchFav();
srchEmpty();

let input = document.getElementById("input");
// let counte = document.getElementsByClassName("fav-counter");

let allMeals = document.getElementById("allMeals");
let favSection = document.getElementsByClassName("fav-section");
// let fav_box = document.getElementById("box");
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// const api_url = ;

// ----------------- Functions ----------------------

// Function for getting data by search and return
async function getMealsBySearch(search) {
  const response = await fetch(apiUrl + `${search}`);
  const data = await response.json();
  const meals = data.meals;
  return meals;
}

// Adding keyup event listener to input
input.addEventListener("keyup", async (e) => {
  // console.log(e.target.value);

  // If input box empty show no data and clean
  if (input.value == "") {
    allMeals.innerHTML = "";
    srchEmpty();
    return;
  }

  const search = input.value;

  // getting all meals
  const meals = await getMealsBySearch(search);
  if (meals) {
    allMeals.innerHTML = "";
    meals.forEach((meal) => {
      addMealToDom(meal);
    });
  } else {
    console.log("empty");
  }
  console.log("meals:", meals);
});

// Function for add Meal to Dom
function addMealToDom(item) {
  // console.log(item);
  const div = document.createElement("div");
  div.classList.add("meal");
  div.innerHTML = `<span>${item.strCategory}</span>
  <div class="meal-img-box">
    <img
      class="meal-img"
      src="${item.strMealThumb}"
      alt="${item.strMeal}"
      data-id="${item.idMeal}"
      data-class="open"
    />
  </div>
  <div class="meal-title-box">
    <p data-id="${item.idMeal}" data-class="open">${item.strMeal}</p>
    <button class="meal-btn" >
    <i class="fa-solid fa-heart"></i>
    </button>
  </div>`;

  div
    .querySelector(".meal-title-box .meal-btn")
    // adding and removing active class to favbtn
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) {
        removeMeal(item.idMeal);
        e.target.classList.remove("active");
      } else {
        setMeal(item.idMeal);
        e.target.classList.add("active");
      }

      document.getElementById("box").innerHTML = "";

      fetchFav();
    });

  allMeals.appendChild(div);
}

// Function for toggle favourite item list
function openFav() {
  favSection[0].classList.add("active-fav");
  favSection[0].classList.remove("close-fav")
  
}

function closeFav(){
  favSection[0].classList.remove("active-fav")
  favSection[0].classList.add("close-fav")

}


//Function for adding Meal Id to localStorage
function setMeal(idMeal) {
  const mealIds = getMeal();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, idMeal]));
}

// Function for removing Meal Id from localStorage
function removeMeal(mealId) {
  const mealIds = getMeal();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

// Function for getting Meal Id from localStorage
function getMeal() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

// Function for getMeal by Id
async function mealById(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${id}`
  );
  const data = await response.json();
  const meal = data.meals;
  // console.log(meal);
  return meal;
}

// Fetching Meal Data from localStorage
async function fetchFav() {
  const mealIds = getMeal();
  document.querySelector(".fav-counter span").innerHTML = mealIds.length;

  if (mealIds.length == 0) {
    noFav();
  }

  for (i = 0; i < mealIds.length; i++) {
    let meal = await mealById(mealIds[i]);
    addtoFav(meal[0]);
  }
}

// adding meal to Favourite Section
function addtoFav(item) {
  const div = document.createElement("div");
  div.classList.add("fav-item");

  div.innerHTML = `
    <button class="fav-close">
      Remove
    </button>
    <img
      class="fav-img"
      src="${item.strMealThumb}"
      alt="${item.strMeal}"
      id="${item.idMeal}"
      data-class="open"
    />
    <div class="fav-txt">
      <p id="${item.idMeal}" data-class="open">${item.strMeal}</p>
    </div>
  `;

  // adding remove function to fav close button
  div.querySelector(".fav-close").addEventListener("click", () => {
    removeMeal(item.idMeal);
    document.getElementById("box").innerHTML = "";
    fetchFav();
  });

  document.getElementById("box").appendChild(div);
}

// If no item in fav list
function noFav() {
  document.getElementById("box").innerHTML = `<div class="no-fav">
  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
  <p>No Favourite Item</p>
</div>`;
}

// if no search
function srchEmpty() {
  let srchEmpty = document.getElementById("allMeals");
  srchEmpty.innerHTML = `<div class="srch-empty">
  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
  <p>No Recipe, Please Search.</p>
</div>`;
}

// Getting id and route to detail page
document.addEventListener("click", (e) => {
  console.log(e.target);
  const target = e.target;
  if (target.dataset.class == "open") {
    const id = target.id || target.dataset.id;
    // console.log(id);
    window.location = `mealdetail.html?id=${id}`;
  }
});
