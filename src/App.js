import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import sayings from './sayings.json';
import Cookies from 'js-cookie';
import { toPng } from 'html-to-image';

const categories = Object.keys(sayings)

const randomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  const rtnval = categories[randomIndex];
  return rtnval
}

function App() {
  const [saying, setSaying] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('random');
  const [imageUrl, setImageUrl] = useState('');
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false); 

  useEffect(() => {
    // Retrieve the name from cookie at component mount
    const savedName = Cookies.get('name');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    // Save the name to a cookie whenever it changes
    Cookies.set('name', name, { expires: 7 }); // Expires in 7 days
  }, [name]);

  const updateSaying = () => {

    // const name = nameRef.current.value;
    // const category = categoryRef.current.value;
    const selectedCategory = category === "random" ? randomCategory() : category;
    const sayingsList = sayings[selectedCategory];
    console.log("category:" + selectedCategory); // Check the value of category
    console.log("name:" + name); // Log the whole sayings object to see its structure
    console.log(sayings)
    console.log(sayings[selectedCategory]); // Check what this evaluates to

    if (!sayingsList) {
      console.log("Please select a valid category")
      return
    }
    const randomIndex = Math.floor(Math.random() * sayingsList.length);
    const randomSaying = sayingsList[randomIndex];
    const rtnval = randomSaying.replace('{name}', name);
    console.log(rtnval)
    setSaying(rtnval);
    setImageVisible(false);
  };

  useEffect(() => {

    if (imageRef.current) {
      toPng(imageRef.current, { cacheBust: true })
        .then((dataUrl) => {
          setImageUrl(dataUrl); // Set the image URL in state
          setImageVisible(true);
        })
        .catch((err) => console.log('Error generating image:', err));
    }
  }, [saying])

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Flirtinator
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" value={category} defaultValue="" fullWidth onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="random">Suprise Me!</MenuItem>
          {categories.map((key) => (

            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}

        </Select>
      </FormControl>
      <TextField fullWidth value={name} label="Enter Name" margin="normal" onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" color="primary" onClick={updateSaying}>
        Generate Image
      </Button>
      <hr />

      {imageUrl && imageVisible && <img src={imageUrl} alt="Generated Saying" style={{ width: '500px', height: '300px' }} />}
      {saying &&
        (<div>
          <div ref={imageRef} style={{
            display: imageVisible ? 'none' : 'flex', // Hide this div once the image is generated
            position: 'relative',
            width: '500px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#1a1a1a',
            color: 'gold',
            border: '10px solid gold',
            fontFamily: '"Playfair Display", serif',
            fontSize: 'calc(10px + 2vmin)',
            textAlign: 'center'
          }}>
            <img src="/gold-star-border-clipart-gold-border-md.png" alt="Decorative Border" style={{
              position: 'absolute',
              top: '10px', // Adjust based on your specific needs
              left: '10px', // Adjust based on your specific needs
              width: '100px', // Set your desired size
              height: '100px' // Set your desired size
            }} />
            <img src="/gold-star-border-clipart-gold-border-md.png" alt="Decorative Border" style={{
              position: 'absolute',
              bottom: '10px', // Adjust based on your specific needs
              right: '10px', // Adjust based on your specific needs
              width: '100px', // Set your desired size
              height: '100px', // Set your desired size
              transform: 'rotate(180deg)' // Rotate 180 degrees
            }} />
            <p style={{ margin: '40px', zIndex: 1 }}> {/* Ensure text is above the images */}
              {saying}
            </p>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: 'gold',
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px',
              zIndex: 2  // Make sure it's above the background but below the text if needed
            }}>
              www.flirtinator.com
            </div>
          </div>

        </div>)}


    </Container >
  );
}

export default App;
