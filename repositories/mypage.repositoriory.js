const { User } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
class MypageRepository {
    
    myinfo = async ( userId ) => {
        return await User.findOne({where :{ id:userId }})
    }

    mypagelest = async ( userId ) => {
        return await Post.findAll({
            where :{ UserId:userId },
            include:[{
                model:User,
                attributes:['nickname','location'],
            },{
                model:Like,
                attributes:['UserId'],
            }]
        })
    }

    likelist = async ( userId ) => {
        const likeposts = await Like.findAll({
            where :{ UserId:userId },
            include:[{
                model:Post,
                attributes:['id','img','title','price','nickname'],
                include:[{
                    model:User,
                    attributes:['nickname','location'],
                },{
                    model:Like,
                    attributes:['UserId']}]
            }]
        })
        return likeposts
    }
    
    Withdrawal = async ( userId ) => {
        await User.destroy({where :{ id:userId }})
    }

    postcheck = async ( postId ) => {
        return await Post.findOne({where :{ id:postId }})
    }

    likecreate = async ( postId, userId ) => {
        await Like.create({ PostId:postId, UserId:userId })
    }

    likefind = async ( postId, userId ) => {
        return await Like.findOne({where :{ PostId:postId, UserId:userId }})
  
    }

    likedestroy = async ( postId, userId ) => {
        await Like.destroy({where :{ PostId:postId, UserId:userId }})
    }
    
};

module.exports = MypageRepository;