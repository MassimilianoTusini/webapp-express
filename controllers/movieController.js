const connection = require('../data/db');

// INDEX per mostrare tutti i post
function index(req, res) {
    console.log("Entrato in movieController.index");
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({ error: 'Errore nel recuper dei film' });

        res.json(results);

    });
};

// SHOW per mostrare un film e le sue recensioni tramite ID 
function show(req, res) {
    console.log("Entrato in movieController.show");

    const id = req.params.id;
    const movieSql = 'SELECT * FROM movies WHERE id = ?'
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?'

    // Connessione per la richiesta
    connection.query(movieSql, [id], (err, movieResult) => {
        // Gestione degli errori
        if (err) return res.status(500).json({ error: 'Film non trovato' })

        if (movieResult.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' })
        }

        const movie = movieResult[0];

        // Connessione per la richiesta della reviews relative
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // Gestione errori
            if (err) return res.status(500).json({ error: 'Errore nel Database' })
            
            // Aggiunta reviews per singolo movie
            movie.reviews = reviewResult;

            res.json(movie);
        });
    });

}

module.exports = { index, show }