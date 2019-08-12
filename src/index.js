const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", function() {
// GET request
  fetch("http://localhost:3000/toys") 
    .then(function(response) {
    return response.json();
    })
    .then(function(jsonToy) {
    showToys(jsonToy);
    })

  // POST request
  document.querySelector(".add-toy-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const toyName = event.target[0].value;
    const toyUrl = event.target[1].value;
    const addedToy = {
      "name": toyName,
      "image": toyUrl,
      "likes": 0
      }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    Accept: "application/json"
      },
    body: JSON.stringify(
      addedToy)
      })
      newToy(addedToy)
    })

// PATCH request
  function likes(event) {
    event.preventDefault();
    const moreLikes = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
      "likes": moreLikes
      })
    })
      .then(function(response) {
        response.json();
      })
       .then(function(like_obj) {
        event.target.previousElementSibling.innerText = `${moreLikes} likes`
     })
    }

  // create Toy Card
  function makeToyCard(toy) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')


    const h2 = document.createElement("h2");
    h2.textContent = toy.name;

    const p = document.createElement("p");
    p.innerText = `${toy.likes} likes`

    const button = document.createElement("button");
    button.className = "like-btn";
    button.textContent = "Like <3";
    button.setAttribute('id', toy.id)
    button.innerText = "like"
    button.addEventListener('click', function(event) {
      console.log(event.target.dataset);
      likes(event)
    })

    // add all elements to div card
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);

    return div;
  }


  // create new Toy & create new toy card
  function newToy(toy) {
    const toy_list = document.querySelector("#toy-collection");
    const card = makeToyCard(toy);
    toy_list.appendChild(card);
  }

  // show all toys created
  function showToys(toyArray) {
    toyArray.map(function(toy) {
      newToy(toy)
    })
    }
})

