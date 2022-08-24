const PostRepository = require("../repositories/post.repository");
const {Like} = require("../models")
const bcrypt = require("bcrypt");

class PostService {
    postRepository = new PostRepository();
    
    //모든 게시글 조회. 데이터를 가져와 반환
    findAllPost = async (userId) => {
        const allPost = await this.postRepository.findAllPost();
        const Posts = allPost.posts.map((post) => {
            
            return {
                postId: post.id,
                img: post.img,
                title: post.title,
                price: post.price,
                createdAt: post.createdAt,
                UserId : post.UserId,
                nickname : post.nickname,
                likecaunt : post.Likes.length,
                loginUserData : { userId
                }
            };
        });
        Posts.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return {
            Posts, 
            status: 200,
        };
    };

    //postId로 하나의 특정 게시글 반환
    findOnePost = async (postId,userId) => {
        const {detailPost,LikeCheck} = await this.postRepository.findOnePost(postId,userId);
        
        
        const post = {
            postId : detailPost.id,
            img : detailPost.img,
            title : detailPost.title,
            price : detailPost.price,
            content : detailPost.content,
            createdAt : new Date(detailPost.createdAt).getTime(),
            nickname : detailPost.User.nickname,
            profile : detailPost.User.profile,
            location : detailPost.User.location,
            like : LikeCheck.length !==0
        };
        return{
            post,
            status:200,
        };
    };
    //게시글 생성
    createPost =  async ( img, title, content, price,userId,nickname) => {
        await this.postRepository.createPost(
            img,
            title,
            content,
            price,
            userId,
            nickname
        );
        return {
            status: 201,
            msg : "게시물이 생성되었습니당근."
        };
    }


    //게시글 삭제
    deletePost = async (postId,password,userId) => {
        const checkPw =await this.postRepository.checkPw(postId,password)
        console.log(checkPw)
        console.log(postId)
        if (postId === null){
            return {
                status:400,
                msg:"게시글이 존재하지 않습니당근."
            };
        };
        if (postId !== userId){
            return {
                status:400,
                msg:"본인 게시글이 아닙니당근."
            };
        };
        if (checkPw.checkPw !== password){
            return {
                status:400,
                msg:"비밀번호가 회원정보와 일치하지 않습니당근."
            };
        };


        
        //const destroy =  await this.postRepository.deletePost( postId, password );
        if (destroy === 0) {
            return {status:400, msg:"알수없는 에러(feat.용성령)"}
        };
        return {
            status:200,
            msg: "게시물이 삭제되었습니당근.",
        };
    };
};

module.exports = PostService;

