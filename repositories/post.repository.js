const { Like, Post ,User} = require("../models")
const bcrypt = require("bcrypt");


class PostRepository {
    //전체 게시글 조회(메인페이지)
    findAllPost = async () =>{
        const posts = await Post.findAll({
        });
        const like = [];
        
        // for ( let i = 0; i< posts.length; i++ );{
        //     const temp = await Like.findAll({
        //         where : { postId: posts[i].postId},
        //     });
        //     like.push(temp.length);
        // };
        return { posts, like };
    };
    
    //게시글 상세조회
    findOnePost = async (postId) => {
        const detailPost = await Post.findOne({
            where : { id:postId },
            include:{
                model:User,
                attributes:['nickname','profile','location'],
            }
        });
        return detailPost
    };

    //게시글 생성
    createPost = async ( img, title, content, price, userId,nickname) => {

        const createPostData = await Post.create({
            img,
            title,
            content,
            price,
            UserId:userId,
            nickname
        });
        return createPostData;
    };

    //게시글 삭제 비밀번호 체크 후 삭제되게 로직
    checkPw = async (postId, password) => {
        const checkPostPwData = await Post.findOne({
            where : { id:postId },
            include:{
                model:User,
                attributes:['password'],
            }
        });
        return { userId : checkPostPwData.UserId, checkPw : checkPostPwData.User.password}
    };
    //게시글 삭제 전 회원정보 확인 후 일치할 경우 삭제 진행
    deletePost = async ( postId ) => {
        const destroy = await Post.destroy({
            where : { id:postId },
        });
        return destroy;

    };

}

module.exports = PostRepository;