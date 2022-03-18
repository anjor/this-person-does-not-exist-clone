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

  return (
    <>
    <div>
      This is a clone of <a href="https://this-person-does-not-exist.com/en">This person does not exist.</a> Except, instead of generating the faces dynamically, the faces are in fact stored on filecoin using <a href="https://estuary.tech/">estuary</a>.
    </div>
    <button onClick={() => setIdx((idx + 1) % images.length)}>Refresh Image</button>
    <br></br>
    <Images images = {images} idx = { idx } />
    </>
  );
}

export default App;
