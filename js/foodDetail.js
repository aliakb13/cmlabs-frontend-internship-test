import { getComponents, getData, getFromUrl } from "../helper/index.js";

const navContainer = document.getElementById("nav-container-foods");
const footerContainer = document.getElementById("footer-container-foods");
const thumbnail = document.getElementById("meal-thumb");
const foodTitle = document.getElementById("food-title");
const recipesContainer = document.getElementById("recipes");
const instructionsContainer = document.getElementById("instructions");
const ytContainer = document.getElementById("embed-yt-tutorial");

document.addEventListener("DOMContentLoaded", () => {
  try {
    getComponents("../navbar.html", navContainer);
    getComponents("../footer.html", footerContainer);
  } catch (err) {
    console.log(err);
  }
});

async function showData() {
  const data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getFromUrl(
      "foodId"
    )}`
  );
  // console.log(data.meals[0]);

  if (data) {
    const meals = data.meals[0];
    const ingredients = desctructIngredient(meals);
    const measure = desctructMeasure(meals);
    const recipes = createRecipes(ingredients, measure);
    thumbnail.src = meals.strMealThumb;
    thumbnail.alt = meals.strMeal;
    const instructionsText = meals.strInstructions;
    const formattedText = instructionsText.replace(/\r?\n/g, "<br>");
    const ytFrame = document.createElement("iframe");
    ytFrame.src = getEmbedUrl(meals.strYoutube);
    ytFrame.width = "100%";
    ytFrame.height = "400px";

    foodTitle.textContent = meals.strMeal;
    ingredients.forEach((_, index) => {
      const ulRecipes = document.createElement("ul");
      ulRecipes.classList.add("card-text");
      ulRecipes.innerHTML = `
        <li>
          <small class="poppins-regular">${recipes[`recipe${index}`]}</small>
        </li>
      `;
      recipesContainer.appendChild(ulRecipes);
    });
    instructionsContainer.innerHTML = formattedText;
    ytContainer.appendChild(ytFrame);
  }
}

function desctructIngredient(meals) {
  const ingredients = [];
  const {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
  } = meals;

  ingredients.push(
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10
  );

  return ingredients;
}

function desctructMeasure(meals) {
  const measure = [];
  const {
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
  } = meals;
  measure.push(
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10
  );
  return measure;
}

function createRecipes(ingredients, measure) {
  const recipes = {};
  ingredients.map((ing, index) => {
    recipes[`recipe${index}`] = `${measure[index]} ${ing}`;
  });
  return recipes;
}

function getEmbedUrl(videoLink) {
  const videoId = videoLink.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

showData();
