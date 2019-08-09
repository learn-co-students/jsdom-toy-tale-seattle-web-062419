const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
toyForm.addEventListener("submit", function(event) {
  event.preventDefault();
  postRequest(event.target)

})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
getRequest()

function getRequest(){
   fetch("http://localhost:3000/toys")
   .then(res =>{
     return res.json()
   })
   .then(json =>{
     showToys(json)
   })
}


function postRequest(data) {

  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers:
      {"Content-Type":"application/json",
      Accept:"application/json"
 },
    body: JSON.stringify({
      "name": data.name.value,
      "image": data.image.value,
      "likes": 0

    })
  })
  .then(resp =>{
    return resp.json()
  
  })
  .then(json =>{
    showToys([json])
    
  })

}

function showToys(objects) {
  const div = document.getElementById("toy-collection");
  objects.map(function(toy) {
   div.appendChild(makeToy(toy))
  })
  

}

function makeToy(object) {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p")
  const button = document.createElement("button")
  div.className = "card"
  img.src = object.image
  img.className = "toy-avatar"
  h2.innerHTML = object.name
  p.innerHTML = object.likes
  button.className = "like-btn"
  button.innerText = "like"
  

  button.addEventListener('click', (event) => {
    
    event.preventDefault()
    
    addLike(p)
    patchRequest(object,p)
   
    
  })
  
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  
  return div
}

function patchRequest(object,p) {

  return fetch(`http://localhost:3000/toys/${object.id}`, {
    method:"PATCH",
    headers:
      {"Content-Type":"application/json",
      Accept:"application/json"},
    body: JSON.stringify({
      "likes": parseInt(p.innerText)

    })
  })
  .then(resp =>{
    resp.json()
  })
  .then(json =>{
     json
  })
}

function addLike(p) {
  p.innerHTML = parseInt(p.innerText) + 1
}


