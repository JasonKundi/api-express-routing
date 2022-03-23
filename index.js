const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

const data = require("./data.js");
const { users } = require("./data");
const { get } = require("express/lib/response");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// GET - returns all users

app.get("/users", (req, res) => {
  res.json({ data: data.users });
});

// USER ENDPOINTS

// GET - returns users by id

app.get("/users/:userId", (req, res) => {
  // gets the user id parameter
  const userId = parseInt(req.params.userId);

  // find the user with that ID
  const user = data.users.find((user) => user.id === userId);
  res.send({ user: user });
});

app.post("/users", (req, res) => {
  // sets up format of what a new user looks like
  const newUser = {
    id: data.users.length + 1,
    email: req.body.email,
  };

  // pushes that user into the user object array
  data.users.push(newUser);
  res.json({ user: newUser });
});

// FILMS ENDPOINTS

app.get("/films", (req, res) => {
  let films
  if(req.query.director) {
    films = data.films.filter(film => film.director === req.query.director)
  }
  if(req.query.genre) {
    films = data.films.filter(film => film.genre === req.query.genre)
  }
  if(req.query.director && req.query.genre) {
    films = data.films.filter(film => film.director && film.genre === req.query.director && req.query.genre)
  }
  res.json({ films: data.films });
});

app.get("/films/:filmId", (req, res) => {
  const filmId = parseInt(req.params.filmId);

  const film = data.films.find((film) => film.id === filmId);
  res.send({ film: film });
});

app.post("/films", (req, res) => {
  const newFilm = {
    id: data.books.length + 1,
    title: req.body.title,
    director: req.body.director,
  };

  data.films.push(newFilm);
  res.json({ film: newFilm });
});


// BOOKS ENDPOINTS

app.get("/books", (req, res) => {
  res.json({ books: data.books})
})

app.get("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);

  const book = data.books.find((book) => book.id === bookId)
  res.send({ book: book})
})

app.post("/books", (req, res) => {
  const newBook = {
    id: data.films.length+1,
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
  }

  data.books.push(newBook)
  res.json({book: newBook})
})

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
