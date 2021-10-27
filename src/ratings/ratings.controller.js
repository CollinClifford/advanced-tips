const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));
const e = require("express");


function ratingExists(req, res, next) {
  const { ratingId } = req.params;
  const foundRating = ratings.find((rating) => (rating.id = Number(ratingId)));
  if (foundRating === undefined) {
    next({ status: 404, message: `Count id not found: ${countId}` });
  } else {
    res.locals.rating = foundRating;
    next();
  }
}

//fix this
function read(req, res) {
//   console.log(res.locals.rating)
  res.json({data: res.locals.rating})
}

function list(req, res) {
  const { noteId } = req.params;
  const byResult = noteId ? (rating) => noteId == rating.noteId : () => true;
  res.json({ data: ratings.filter(byResult) });
}

module.exports = {
  list,
  read: [ratingExists, read],
}