let queryString = window.location.search;
// console.log(queryString);

const urlParams = new URLSearchParams(queryString);
//
const id = urlParams.get("id");
// console.log(id);

const str = urlParams.get("title");
// console.log(str);

async function newArr() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}&`
    );
    let data = await response.json();
    console.log(data);

    data.meals.forEach((element) => {
      console.log(element.strMeal);
      let show = `<div class="box">
      <h1 class="title">${element.strMeal}</h1>
      <div class="wrapper">
      <div class="image">
        <img src="${element.strMealThumb}" alt="">
      </div>
      <div class="ingredient">
      <h2>Ingredients</h2>
      <div class="measure">
      <ul class="ingr-lists">
        <li>${element.strIngredient1}</li>
        <li>${element.strIngredient2}</li>
        <li>${element.strIngredient3}</li>
        <li>${element.strIngredient4}</li>
        <li>${element.strIngredient5}</li>
        <li>${element.strIngredient6}</li>
        <li>${element.strIngredient7}</li>
        <li>${element.strIngredient8}</li>
      </ul>

      <ul class="ing-measures">
          <li>${element.strMeasure1}</li>
          <li>${element.strMeasure2}</li>
          <li>${element.strMeasure3}</li>
          <li>${element.strMeasure4}</li>
          <li>${element.strMeasure5}</li>
          <li>${element.strMeasure6}</li>
          <li>${element.strMeasure7}</li>
          <li>${element.strMeasure8}</li>
        </ul>

      </div>
      </div>
      </div>

      <div class="instruction">
        <h3>Instructions</h3>
        <p>${element.strInstructions}</p>
        
      </div>

      <div>
        <span><strong>Tags: </strong></span><span>${element.strTags}</span>
      </div>


    </div>`;

      document.getElementById("main").innerHTML = show;
    });
  } catch (error) {
    console.log(error);
  }
}

newArr();
