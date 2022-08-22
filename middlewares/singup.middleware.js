const Joi = require("joi");

module.exports = async (req, res, next) => {
  const body = req.body;
  const schema = Joi.object().keys({
    // 계정@도메인.최상위도메인 형식의 데이터
    email: Joi.string()
      .email(),
    //   .pattern(new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")),
    // // 한글, 영문, 특수문자 (- _ .) 포함한 2 ~ 12글자 닉네임
    nickname: Joi.string(),//.pattern(new RegExp("^[a-zA-Zㄱ-힣0-9-_.]{2,12}$")),
    //   최소 8 자- 최대 13자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
    password: Joi.string(),//.pattern(
    //   new RegExp(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,13}$/
    //   )
    // ),
    profile: Joi.string(),
    location: Joi.string(),
  });

  try {
    // 검사시작
    await schema.validateAsync(body);
  } catch (err) {
    // 유효성 검사 에러
    const problem = err.message.split('"')[1];
    const message = problem + " 형식이 올바르지 않다. ";
    return res.status(400).json({ message });
  }
  next();
};