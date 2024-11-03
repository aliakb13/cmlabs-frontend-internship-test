import { getComponents, getData, getFromUrl } from "../helper/index.js";

const navContainer = document.getElementById("nav-container");
const footerContainer = document.getElementById("footer-container");
const listFoodsContainer = document.getElementById("meals-data");

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
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${getFromUrl(
      "category"
    )}`
  );

  if (data) {
    const meals = data.meals;
    meals.forEach((meal) => {
      const divCol = document.createElement("div");
      divCol.classList.add("col");
      divCol.innerHTML = `
        <div class="card p-4" style="width: 100%">
          <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="meal-${meal.idMeal}" />
          <div class="card-body">
            <h5 class="card-title poppins-bold">${meal.strMeal}</h5>
          </div>
          <a class="btn btn-primary" href="/food-detail/food-detail.html?foodId=${meal.idMeal}">Read More</a>
        </div>
      `;
      listFoodsContainer.appendChild(divCol);
    });
  } else {
    console.log("error");
  }
}

showData();
