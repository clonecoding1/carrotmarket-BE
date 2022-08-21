const { CustomException } = require("../exceptionhandler/exception.Processing");

/**
 *
 * @param { Error } err
 * @returns { CustomException }
 */
// console.log(err instanceof CustomException) // instanceof 앞의 객체가 존제하는지 확인 뒤는 판별목표
const exceptionHandler = (err) => {
  if (err instanceof CustomException) return err;
  return err;
};

module.exports = exceptionHandler; // 나중에 존재 이유에 대해서 생각 하자