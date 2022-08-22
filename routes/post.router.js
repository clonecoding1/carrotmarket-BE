const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth.middleware")
const PostController = require("../controllers/post.controller");
const postController = new PostController();

//게시글 전체조회(메인페이지)
router.get("/post",postController.findAllPost);

//게시글 작성
router.post("/post", auth,postController.createPost);

//게시글 조회
router.get("/post/:postId",auth,postController.findOnePost);

//게시글 삭제
router.delete("/post/:postId",auth,postController.deletePost);


module.exports = router;