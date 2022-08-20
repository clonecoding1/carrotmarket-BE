const PostRepository = require("../repositories/post.repository");

class PostService {
    postRepository = new PostRepository();
    
    //모든 게시글 조회. 데이터를 가져와 반환
    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();

        const Posts = allPost.posts.map((post, idx) => {
            return {
                postId: post.postId,
                img: post.img,
                title: post.title,
                price: post.price,
                createdAt: post.createdAt,
                like: allPost.like[idx],
            };
        });
        Posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return {
            Posts,
            status: 200,
        };
    };

    //postId로 하나의 특정 게시글 반환
    findOnePost = async (postId) => {
        const findPostData = await this.postRepository.findOnePost(postId);

        const post = {
            postId : findPostData.postId,
            img : findPostData.img,
            title : findPostData.title,
            price : findPostData.price,
            content : findPostData.content
        };
        return{
            post,
            status:200,
        };
    };
    //게시글 생성
    createPost =  async ( img, title, content, price,userId ) => {
        await this.postRepository.createPost(
            img,
            title,
            content,
            price,
            userId
        );
        return {
            status: 201,
            msg : "게시물이 생성되었습니당근."
        };
    }


    //게시글 삭제
    deletePost = async (postId,password) => {
        if (!(await this.postRepository.checkPw(PostId,pw))){
            return {
                status:400,
                msg:"비밀번호가 회원정보와 일치하지 않습니당근."
            };
        }
        await this.postRepository.deletePost( postId, password );
        return {
            status:200,
            msg: "게시물이 삭제되었습니당근.",
        };
    };
};

module.exports = PostService;