const express = require("express");
const app = express();
const port = 3000;
const movieRouter = require("./routers/movies");

// Middleware per leggere JSON
app.use(express.json());

// Middleware per file statici
app.use(express.static("public"));

// Rotta base
app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nella Movies API</h1><p>Vai su <a href='/movies'>/movies</a> per vedere la lista dei film.</p>")
});

app.use("/movies", movieRouter);
console.log("Router montato su /movies");

// MIddleware per rotte non trovate
const notFound = require("./middlewares/notFound");
app.use(notFound);
const errorHandler = require("./middlewares/errorHandler")
app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`)
})