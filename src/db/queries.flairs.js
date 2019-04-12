const Flair = ("./models").Flair;
const Post = ("./models").Post;


module.exports = {
  
  addFlair(newFlair, callback) {
    return Flair.create(newFlair)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
