getFoods();

// Selectors
let foodContainer = document.querySelector("#food-container");

let nameInput = document.querySelector("#name-input");
let ratingInput = document.querySelector("#rating-input");
let pictureInput = document.querySelector("#picture-input");
let idInput = document.querySelector("#id-input");

let addFoodBtn = document.querySelector("#add-food-btn");
// let updateFoodbtn = document.querySelector("#updateFood");
// let deleteFoodbtn = document.querySelector("#deleteFood");

console.log(foodContainer);

// event listeners
addFoodBtn.addEventListener("click", addFoodie);

// updateFoodbtn.addEventListener("click", updateFoodie);
// deleteFoodbtn.addEventListener("click", deleteFoodie);

// function
function addFoodie() {
  let newFood = {
    name: nameInput.value,
    image: pictureInput.value,
    rating: Number(ratingInput.value),
    id: Number(idInput.value),
  }; // skapar ett nytt objekt.

  console.log(newFood);

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
  nameInput.value = "";
  pictureInput.value = "";
  ratingInput.value = "";
  idInput.value = "";
}

function getFoods() {
  fetch("http://localhost:5085/Food")
    .then((response) => response.json())
    .then((foodData) => displayFoodsToServer(foodData));
}

let anotherFoodContainer = document.querySelector("#anotherfoodContainer");

function displayFoodsToServer(foods) {
  anotherFoodContainer.innerHTML = "";
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
              <p>Rating: ${foodfromServer.rating} /10</p>
              <p> Id: ${foodfromServer.id}</p>
              <div class="d-flex justify-content-between">
                <button id="${foodfromServer.id}" onclick="updateFood(this)" class="btn btn-warning " >Update</button>
                <button id="${foodfromServer.id}" onclick="deleteFood(this)" class="btn btn-danger " >Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    anotherFoodContainer.innerHTML += html;
  });
  // Skpar dessa 2 efter att VS körs uppifrån ner, efter att objects har skapats.
  //   let updateFoodbtn = document.querySelector(`#${foodfromServer.id}`);
  //   let deleteFoodbtn = document.querySelector(`#${foodfromServer.id}`);
  // Skpar dessa 2 efter att VS körs uppifrån ner, efter att objects har skapats.
  //   updateFoodbtn.addEventListener("click", updateFood);
  //   deleteFoodbtn.addEventListener("click", deleteFood);
}

function updateFood(element) {
  // Fixa logik sen för att uppdatera..
  const updatedFood = {
    name: nameInput.value,
    rating: ratingInput.value,
    image: pictureInput.value,
    id: idInput.value,
  };

  let id = element.id;

  fetch(`http://localhost:5085/Food/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedFood),
  });

  addFoodie();
}

function deleteFood(element) {
  let id = element.id;
  fetch(`http://localhost:5085/Food/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      getFoods();
    } else {
      console.warn("Something is wrong the the API");
    }
  });
}
