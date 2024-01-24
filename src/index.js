const tableBody = document.querySelector("#table-body");


console.log(tableBody);

fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogs => dogs.forEach(dog => {
    renderDog(dog)
  }))

function renderDog(dog) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit Dog</button></td>
  `
  tableBody.append(tableRow);
}