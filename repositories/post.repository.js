const { Like,Post } = require("../models")
const { post } = require("../routes/post.router");


class PostRepository {
    //전체 게시글 조회(메인페이지)
    findAllPost = async () =>{
        const posts = await post.findAllPost();
        const like = [];
        
        for ( let i = 0; i< posts.length; i++ );{
            const temp = await Like.findAll({
                where : { postId: posts[i].postId},
            });
            like.push(temp.length);
        };
        return { posts, like };
    };
    
    //게시글 상세조회
    findOnePost = async (postId) => {
        const detailPost = await post.findOne({
            where : { postId },
        });
        return detailPost
    };

    //게시글 생성
    createPost = async ( img, title, content, price, userId) => {
        const createPostData = await post.create({
            img,
            title,
            content,
            price,
            userId,
            like:0,
        });
        return createPostData;
    };

    //게시글 삭제 비밀번호 체크 후 삭제되게 로직
    checkPw = async (postId, password) => {
        const checkPostPwData = await post.findOne({
            where : { postId },
        });
        if ( password === checkPostPwData.password ){
            return true;
        } else {
            return false;
        }
    };

    deletePost = async ( postId ) => {
        await post.destroy({
            where : { postId },
        });
    };

}

module.exports = PostRepository;