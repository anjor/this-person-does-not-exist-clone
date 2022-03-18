import React from 'react'
import Images from './Images';



function App() {
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)

  function fetchData() {

      fetch("https://anjor-simple-flask-server.herokuapp.com/data/list")
      .then(response => response.json())
      .then(data => setImages(data))
  }
  
  React.useEffect(fetchData, [])

  function parseHash(url) {
    const len = url.length
    return url.slice(8, len-15)
  }

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function addToCollection(url, collection) {
    postData("https://anjor-simple-flask-server.herokuapp.com/collections/" + collection, { cid: parseHash(url)})
    .then(data => console.log(data))
  }

  function incrementIdx() {
    setIdx((idx + 1) % images.length)
  }

  return (
    <>
    <div>
      This is a clone of <a href="https://this-person-does-not-exist.com/en">This person does not exist.</a> Except, instead of generating the faces dynamically, the faces are in fact stored on filecoin using <a href="https://estuary.tech/">estuary</a>.
    </div>
    <button onClick={() => incrementIdx()}>Refresh Image</button>
    <br></br>
    <div>
      Identify, and tag the picture as male, female or child.
    </div>
    <button onClick={() => {addToCollection(images[idx], "male"); incrementIdx()}}>Male</button>
    <button onClick={() => {addToCollection(images[idx], "female"); incrementIdx()}}>Female</button>
    <button onClick={() => {addToCollection([images[idx], "child"]); incrementIdx()}}>Child</button>
    <Images images = {images} idx = { idx } />
    </>
  );
}

export default App;
