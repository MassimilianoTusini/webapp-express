const express = require("express");
const app = express();
const port = 3000;
const movieRouter = require("./routers/movies");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const setImagePath = require('./middlewares/imagePath');
const cors = requore("cors");

// Middleware per CORS
app.use(
    cors({
        origin: process.env.WA_REACT
    })
);

// Middleware per leggere JSON
app.use(express.json());

// Middleware per file statici
app.use(express.static("public"));

// Middleware per gestire i path delle immagini
app.use(setImagePath);

// Rotta base
app.get("/api", (req, res) => {
    res.send("<h1>Benvenuto nella Movies API</h1><p>Vai su <a href='/movies'>/movies</a> per vedere la lista dei film.</p>");
});

// Rotte principali
app.use("/api/movies", movieRouter);
console.log("Router montato su /movies");

// Middleware per rotte non trovate
app.use(notFound);

// Middleware gestione errori
app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});