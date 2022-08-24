const MypageRepository = require("../repositories/mypage.repositoriory");


class MypageService {
    mypageRepository = new MypageRepository();
    
    myinfo = async ( userId ) => {
        const userdate = await this.mypageRepository.myinfo( userId )
        const dete = {
            user: {
                userId: userdate.id,
                email: userdate.email,
                nickname: userdate.nickname,
                location: userdate.location,
                profile: userdate.profile,
            }
        }
        return {status:200, dete }
    }

    mypage = async ( userId ) => {
        const postlist = await this.mypageRepository.mypagelest( userId )
        postlist.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        const mypage = postlist.map(post => {
            return { mypage:{
                postId: post.id,
                img: post.img,
                title: post.title,
                price: post.price,
                nickname: post.User.nickname,
                location: post.User.location,
                likeCount: post.Likes.length
                }
            }
        });
        return {status:200, mypage }
    }

    likelist = async ( userId ) => {
        const postlists = await this.mypageRepository.likelist( userId )
        postlists.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        const likelist = postlists.map(like => {
            return { likelist:{
                postId: like.Post.id,
                img: like.Post.img,
                title: like.Post.title,
                price: like.Post.price,
                nickname: like.Post.nickname,
                location: like.Post.User.location,
                likeCount: like.Post.Likes.length
                }
            }
        });
        return {status:200, likelist }
    }

    Withdrawal = async ( userId ) => {
        try {
            const date = await this.mypageRepository.myinfo( userId )
            if(!date){
                return {status:400, message:"이미 없는 아이디 입니다."}
            }
        } catch {
            return {status:400, message:"db에서 회원정보 조회중 오류"}
        }
        await this.mypageRepository.Withdrawal( userId )
        return {status:200, message:"회원 가입 탈퇴"}
    }

    like = async ( postId, userId ) => {
        const postcheck = await this.mypageRepository.postcheck( postId )
        if (!postcheck){
            return {status:400, message:"존재하지 않는 게시글입니다."}
        }
        const date = await this.mypageRepository.likefind( postId, userId )
        if(!date){
            await this.mypageRepository.likecreate( postId, userId )
            return {status:201, message:"관심 목록에 추가되었습니다."}
        }else{
            await this.mypageRepository.likedestroy( postId, userId )
            return {status:200, message:"관심 목록에 제거되었습니다."}
        }
    }

};

module.exports = MypageService;