const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;
const Post = require("../../src/db/models").Post;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Geography",
        description: "Information about Maryland"
      })
      .then((topic) => {
        this.topic = topic;

      Post.create({
        title: "Birds of Maryland",
        body: "A list of all native birds",
        topicId: this.topic.id
      })
      .then((post) => {
        this.post = post;

        Flair.create({
          name: "BlueJay",
          color: "Blue",
          postId: this.post.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

});

  describe("GET /posts/:postId/flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });


 describe("POST /posts/:postId/flairs/create", () => {

   it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}/${this.post.id}/flairs/create`,
        form: {
          name: "Cardinal",
          color: "Red",
          postId: this.post.id
        }
      };
      request.post(options,
        (err, res, body) => {

          Flair.findOne({where: {name: "Cardinal"}})
          .then((flair) => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("Cardinal");
            expect(flair.color).toBe("Red");
            expect(flair.postId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });

   });

});
