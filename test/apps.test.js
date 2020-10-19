const { expect } = require("chai");
const app = require("../app");
const supertest = require("supertest");
const playstore = require("../playstore.js");

describe("/app GET endpoint", () => {
  it("returns the full playStore array when no queries are provided", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => expect(res.body).to.deep.equal(playstore));
  });

  it("returns 400 to invalid sort query", () => {
    return supertest(app).get("/apps").query({ sort: "bob" }).expect(400);
  });

  it("returns 400 if the genre isn't valid", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "supercooolgenre" })
      .expect(400);
  });

  it("returns filtered genre array", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "action" })
      .then((res) =>
        expect(res.body).to.deep.equal(
          playstore.filter((app) => app.Genres.includes("Action"))
        )
      );
  });

  it("returns an array sorted by rating", () => {
    const ratingsAscending = playstore.sort((a, b) => a.Rating - b.Rating);
    return supertest(app)
      .get("/apps")
      .query({ sort: "rating" })
      .then((res) => {
        expect(res.body.map((app) => app.Rating)).to.deep.equal(
          ratingsAscending.map((app) => app.Rating)
        );
      });
  });

  it("returns a sorted and filtered array", () => {
    const sortedFiltered = playstore
      .filter((app) => app.Genres.includes("Casual"))
      .sort((a, b) => a.Rating - b.Rating);

    return supertest(app)
      .get("/apps")
      .query({ sort: "rating", genres: "casual" })
      .then(res=>{
        expect(res.body.map(app=>app.Rating)).to.deep.equal(sortedFiltered.map(app=>app.Rating))
        expect(res.body).to.deep.have.members(sortedFiltered)
      })
  });
});
