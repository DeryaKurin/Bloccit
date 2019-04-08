const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";

const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Ad;

describe("routes : ads", () => {

  //#2
    beforeEach((done) => {
      this.ad;
      sequelize.sync({force: true}).then((res) => {

       Ad.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
       })
        .then((ad) => {
          this.ad = ad;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });


  describe("GET /ads", () => {

    it("should return a status code 200 and all ads", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });

  describe("GET /ads/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });

  });

  describe("POST /ads/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-181 songs",
          description: "What's your favorite blink-181 song?"
        }
      };


     it("should create a new advertisement and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Ad.findOne({where: {title: "blink-182 songs"}})
            .then((ad) => {
              expect(res.statusCode).toBe(303);
              expect(ad.title).toBe("blink-182 songs");
              expect(ad.description).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });
});
