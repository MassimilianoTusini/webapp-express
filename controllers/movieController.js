const connection = require('../data/db');

// INDEX per mostrare tutti i post
function index(req, res) {
    console.log("Entrato in movieController.index");
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({ error: 'Errore nel recuper dei film' });

        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movies);

    });
};

// SHOW per mostrare un film e le sue recensioni tramite ID 
function show(req, res) {
  const id = parseInt(req.params.id);
  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: "Errore query movie" });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    const movie = { ...movieResults[0] };
    movie.image = req.imagePath + movie.image;

    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err)
        return res.status(500).json({ error: "Errore query recensioni" });

      if (reviewResults.length > 0) {
        const media =
          reviewResults.reduce((sum, r) => sum + (r.vote || 0), 0) /
          reviewResults.length;
        movie.media_voti = parseFloat(media.toFixed(1));
      } else {
        movie.media_voti = null;
      }

      movie.reviews = reviewResults;
      res.json(movie);
    });
  });
}
module.exports = { index, show }