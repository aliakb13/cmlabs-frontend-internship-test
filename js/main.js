// let data;
const containerMeals = document.getElementById("meals-data");

async function getData() {
  const meals = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return meals.data.categories;
}

async function showData() {
  const data = await getData();

  if (data) {
    data.forEach((obj) => {
      const divCol = document.createElement("div");
      divCol.classList.add("col");
      divCol.innerHTML = `
        <div class="card mb-3 p-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${obj.strCategoryThumb}" class="img-fluid rounded-start" alt="${obj.idCategory}" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title poppins-bold">${obj.strCategory}</h5>
              </div>
            </div>
          </div>
          <div class="accordion poppins-regular" id="accordionExample">
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#${obj.idCategory}"
                  aria-expanded="false"
                  aria-controls="${obj.idCategory}"
                >
                  About ${obj.strCategory} category
                </button>
              </h2>
              <div
                id="${obj.idCategory}"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body d-xl-flex flex-xl-column">
                 ${obj.strCategoryDescription}
                 <a class="btn btn-primary mt-3" href="food-detail.html">
                    Find More
                 </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      containerMeals.appendChild(divCol);
    });
  } else {
    console.log("something error");
  }
}

showData();
