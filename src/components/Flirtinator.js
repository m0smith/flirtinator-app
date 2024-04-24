import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Paper } from '@mui/material';
import sayings from '../sayings.json';
import Cookies from 'js-cookie';
import { toPng } from 'html-to-image';
import MoreFlirting from "./MoreFlirting"
import './Flirtinator.css'

const categories = Object.keys(sayings)

const randomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  const rtnval = categories[randomIndex];
  return rtnval
}

function Flirtinator() {
  const [saying, setSaying] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('random');
  const [imageUrl, setImageUrl] = useState('');
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [isFlirty, setIsFlirty] = useState(true);
  const [backgroundUrl, setBackgroundUrl] = useState('https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg');

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

  // const handleShare = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: 'Flirtinator Creation',
  //         text: 'Just thinking of you',
  //         url: imageUrl  // This is the URL of the image you generated and want to share.
  //       });
  //       console.log('Content shared successfully');
  //     } catch (error) {
  //       console.error('Error sharing:', error);
  //     }
  //   } else {
  //     // Fallback for browsers that do not support the Share API
  //     alert('Sharing is not supported in your browser. Please try on a mobile device!');
  //   }
  // };


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
      <Paper style={{ padding: '20px', marginTop: '20px', marginBottom: '40px', backgroundColor: '#fce4ec', borderRadius: '15px' }}>
        <Typography variant="subtitle1" gutterBottom>
          Welcome to Flirtinator, where every message is a chance to make someone's day!
          In a world where distance often keeps us apart, a little flirt, a word of appreciation,
          or a gesture of encouragement can bridge miles in a heartbeat.
          Unexpected expressions of affection are not just about romance;
          they remind us that we are cherished and thought of fondly.
          Let Flirtinator help you send a sparkle across the digital divide and light up someone’s day.
          It’s about letting those special people in your life know they’re in your heart and on your mind,
          no matter the miles between you.
        </Typography>
        <Typography>
          <MoreFlirting />
        </Typography>
      </Paper>
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

      {imageUrl && imageVisible &&
        <div>

          <img src={imageUrl} alt="Generated Saying"  />
        </div>}
      {saying &&
        (<div className="flirty2-mainBackground" 
              style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <p className="flirty2-text">{saying}</p>
        <div className="flirty2-footer">
            flirtinator.com
        </div>
    </div>
    )}

       



    </Container >
  );
}

export default Flirtinator;
