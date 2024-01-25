const tableBody = document.querySelector("#table-body");
const dogFormInputs = document.querySelectorAll("#dog-form input");
const dogName = dogFormInputs[0];
const dogBreed = dogFormInputs[1];
const dogSex = dogFormInputs[2];
console.log(tableBody);

fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogs => {
    dogs.forEach(dog => {
      renderDog(dog)
    })
  })

//Render dog list in table rows
function renderDog(dog) {

  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit Dog</button></td>
  `
  tableBody.append(tableRow);
  tableRow.querySelector("button").addEventListener("click", () => handleEditClick(dog))
}

//When edit dog is clicked, the dog data fills in the form
function handleEditClick(dog) {
  const dogForm = document.querySelector("#dog-form")
  dogName.value = dog.name;
  dogBreed.value = dog.breed;
  dogSex.value = dog.sex;

  dogForm.addEventListener("submit", (e) => handleSubmit(e, dog))
}

//Dog data is updated if user enters something different in the form
function handleSubmit(e, dog) {
  e.preventDefault();
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: dogName.value,
      breed: dogBreed.value,
      sex: dogSex.value,
    })
  })
    .then(res => res.json())
    .then(() => {
      document.querySelector("#dog-form").reset();
      fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(dogs => {
          tableBody.innerHTML = "";
          dogs.forEach(dog => {
            renderDog(dog)
          })
        })
    })
}