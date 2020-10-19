const playStore = require("./playstore.js");

function handleAppsEndpoint(req, res) {
  const { sort = false, genres = false } = req.query;
  const genresArray = [
    "action",
    "puzzle",
    "strategy",
    "casual",
    "arcade",
    "card",
  ];
  let responseArray = playStore;
  if (sort && !(sort === "rating" || sort === "app")) return res.status(400).send("invalid query");
  if (sort === "rating" || sort === "app") {
    const sortBy = sort.charAt(0).toUpperCase() + sort.slice(1);
    console.log(sortBy);
    responseArray = responseArray.sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }
  if (genres && !genresArray.includes(genres)) return res.status(400).send("invalid query")
  if (genresArray.includes(genres)) {
    responseArray = responseArray.filter((app) =>
      app.Genres.toLowerCase().includes(genres.toLowerCase())
    );
  }

  res.json(responseArray);
}

module.exports = { handleAppsEndpoint };
