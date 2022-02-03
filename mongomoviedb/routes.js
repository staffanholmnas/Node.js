const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');

// Fetch all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

// Add a movie
router.post("/movies", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json({ newMovie });
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

})

// Delete movie by title
router.delete("/movies", async (req, res) => {
  await Movie.deleteOne({title: req.body.title}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    else {
      res.status(200).json(result);
    }
  });
})

// Update movie by id
router.put("/movies/:id", async (req, res) => {
  await Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => { 
    if (err){ 
      return res.status(500).json({ message: err.message });
    } 
    else{ 
      res.status(200).json({ result });
    } 
  }).clone().catch(function(err){ console.log(err)}) 
})

module.exports = router;