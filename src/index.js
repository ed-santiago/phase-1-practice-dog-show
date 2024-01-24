fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogs => console.log(dogs))