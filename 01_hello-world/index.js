// How different module connect to each other 
// const math = require('./math.js')

// console.log("Hello World!!");
// console.log(math);
// console.log(math.add(2,5)); // 7
// console.log(math.sub(2,5)); // -3
// console.log(math.pt); // pratham

const { addFn, subFn, pt} = require("./math.js")
// import { addFn, subFn, pt } from './math.js';

console.log(addFn(2,5)); // 7
console.log(subFn(2,5)); // -3
console.log(pt); // pratham


