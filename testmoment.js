const moment = require('moment')
let fifteen = moment().add(15, 'minutes').format();
let now = moment().format()

console.log(typeof fifteen);
console.log(now);
// console.log(fifteen == now);