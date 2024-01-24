getFoods();

// Selectors
let foodContainer = document.querySelector("#food-container");

let nameInput = document.querySelector("#name-input");
let ratingInput = document.querySelector("#rating-input");
let pictureInput = document.querySelector("#picture-input");

let addFoodBtn = document.querySelector("#add-food-btn");

console.log(foodContainer);

// event listeners
addFoodBtn.addEventListener("click", addFoodie);

// function
function addFoodie() {
  let newFood = {
    name: nameInput.value,
    picture: pictureInput.value,
    rating: Number(ratingInput.value),
  }; // skapar ett nytt objekt.

  fetch("http://localhost:5085/Food", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFood),
  }).then((response) => {
    if (response.ok) {
      getFoods();
    } else {
      console.warn("Something is wrong the the API");
    }
  });
}

function getFoods() {
  fetch("http://localhost:5085/Food")
    .then((response) => response.json())
    .then((foodData) => displayFoodsToServer(foodData));
}

// function displayFoodsToServer(foods) {
//   foods.forEach((foodfromServer) => {
//     foodContainer.innerHTML += `
//     <div class ="user col-4">
//     <img style="width: 200px; height: 200px; object-fit: cover;" src="${foodfromServer.image}"/>,
//     <p <span class="dish"> Food dish: ${foodfromServer.name}
//     <p class="points" > Rating: ${foodfromServer.rating}
//     </div>
//     `;
//   });
//   console.log(foods);
// }

// another-foodContainer

let anotherFoodContainer = document.querySelector("#anotherfoodContainer");

function displayFoodsToServer(foods) {
  foods.forEach((foodfromServer) => {
    let html = `
        <div class="user col-4 mb-3"> 
        <!-- GÖR RUNDA BORDERS -->

          <div class="card h-100 border rounded"> 
          <!-- GÖR BILDEN RUNDADD -->

            <img src="${foodfromServer.image}" class="card-img-top img-fluid rounded" style="height: 200px; object-fit: cover;" />
            <!-- LÄGG IN DOM I EN CARD så dom displayas som i pokemon --> 
            <div class="card-body">
              <p class="h5">Food dish: ${foodfromServer.name}</p>
              <p>Rating: ${foodfromServer.rating}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-warning" >Update</button>
                <button class="btn btn-danger" >Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    anotherFoodContainer.innerHTML += html;
  });
}
