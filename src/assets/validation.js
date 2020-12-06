/* eslint-disable no-unused-vars */
export default function validate(field, value) {
  return eval(field)(value)
}
// function username(name){
//   let regex = "/^[ a-zA-Z]{6,21}$/";
//   return regex.test(name);
// }
function password(password) {
  //>= 8chars ( at least 1 digit, lower & uppercase alphabet, special chars)
  //excludes space
  let regex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/
  return regex.test(password)
}
function confirmPassword(confirmPassword) {
  return password(confirmPassword)
}
function email(email) {
  // let regex = /^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/
  // return regex.test(email)
  return true
}
