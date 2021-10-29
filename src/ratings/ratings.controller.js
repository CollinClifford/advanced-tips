const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));
const e = require("express");

function ratingExists(req, res, next) {
  const { ratingId } = req.params;
  const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
  if (foundRating === undefined) {
    next({ status: 404, message: `Count id not found: ${ratingId}` });
  } else {
    res.locals.rating = foundRating;
    next();
  }
}

function read(req, res) {
  res.json({ data: res.locals.rating });
}

function list(req, res, next) {
  const { noteId } = req.params;
  const { ratingId } = req.params;

  if (noteId) {
    const rating = ratings.filter((rating) => noteId == rating.noteId);
    if (ratingId) {
      res.json({ data: rating[0] });
    } else {
      res.json({ data: rating });
    }
  } else {
    res.json({ data: ratings });
  }
}

module.exports = {
  list,
  read: [ratingExists, read],
  ratingExists,
};
