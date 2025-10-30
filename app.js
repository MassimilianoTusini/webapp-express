const express = require("express");
const app = express();
const port = 3000;
const movieRouter = require("./routers/movies");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const imagePath = require('./middlewares/imagePath');

// Middleware per leggere JSON
app.use(express.json());

// Middleware per file statici
app.use(express.static("public"));

// Rotta base
app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nella Movies API</h1><p>Vai su <a href='/movies'>/movies</a> per vedere la lista dei film.</p>")
});

app.use("/api/movies", movieRouter);
console.log("Router montato su /movies");

// Middleware gestione Path imgs per le rotte
app.use(imagePath);

// MIddleware per rotte non trovate
app.use(notFound);
app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`)
})