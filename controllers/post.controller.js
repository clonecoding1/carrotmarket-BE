const { post } = require("../routes/post.router");
const PostService = require("../services/post.service");

class PostController{
    postService = new PostService();

    //게시글 목록조회(메인페이지)
    findAllPost = async (req, res) => {
        const { offset } = req.query;
        const allPost = await this.postService.findAllPost();

        res.status(200).json({ allPost });
    };

    //게시글 생성
    createPost = async (req, res) => {
        const { title,content,price,img } = req.body;
        const { userId } = res.locals;
        
        
        const createPostData = await this.postService.createPost(
            img,
            title,
            content,
            price,
            userId,
        );
        res.status(createPostData.status).json({ data: createPostData.msg })
    };

    //게시글 상세조회
    findOnePost = async (req, res, next) => {
        const { postId } = req.params;
        const postData = await this.postService.findOnePost(Number(postId));
        console.log(postData)
        res.status(postData.status).json({ data: postData.post });
    };

    //게시글 삭제
    deletePost = async( req,res,next ) => {
        const { postId } = req.params;
        const { password } = req.body;
        const { userId } = res.locals;
        const deletePost = await this.postService.deletePost(
            Number(postId),
            password,
            userId
        );
        res.status(deletePost.status).json({ data:deletePost });
    };
};
module.exports = PostController;