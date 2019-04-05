const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/adds/";

const sequelize = require("../../src/db/models/index").sequelize;
const Add = require("../../src/db/models").Add;

describe("routes : adds", () => {

  beforeEach((done) => {
      this.add;
      sequelize.sync({force: true}).then((res) => {

       Add.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
       })
        .then((add) => {
          this.add = add;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });


  describe("GET /adds", () => {

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

  describe("GET /adds/new", () => {

     it("should render a new advertisement form", (done) => {
       request.get(`${base}new`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("New Advertisement");
         done();
       });
     });

  });

  describe("POST /adds/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };


      it("should create a new add and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Add.findOne({where: {title: "blink-182 songs"}})
            .then((add) => {
              expect(res.statusCode).toBe(303);
              expect(add.title).toBe("blink-182 songs");
              expect(add.description).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });


   //  describe("GET /adds/:id", () => {
   //
   //   it("should render a view with the selected add", (done) => {
   //     request.get(`${base}${this.add.id}`, (err, res, body) => {
   //       expect(err).toBeNull();
   //       expect(body).toContain("JS Frameworks");
   //       done();
   //     });
   //   });
   //
   // });
});
});
