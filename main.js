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

function displayFoodsToServer(foods) {
  foods.forEach((foodfromServer) => {
    foodContainer.innerHTML += `<img style="width: 200px; height: 200px; object-fit: cover;" src="${foodfromServer.image}"/>, <p> Name: ${foodfromServer.name}, Rating: ${foodfromServer.rating} `;
  });
  console.log(foods);
}
