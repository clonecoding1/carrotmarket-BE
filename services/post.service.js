const PostRepositroy = require("../repositories/post.repository");

class PostService {
  postsRepositroy = new PostRepositroy();
}

module.exports = PostService;
