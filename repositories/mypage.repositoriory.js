const { User } = require("../models");
const { Post } = require("../models");
class MypageRepository {
    
    myinfo = async ( userId ) => {
        return await User.findOne({where :{ id:userId }})
    }

    mypagelest = async ( userId ) => {
        return await Post.findAll()
    }

    Withdrawal = async ( userId ) => {
        await User.destroy({where :{ id:userId }})
    }
    
};

module.exports = MypageRepository;