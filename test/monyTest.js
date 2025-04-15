import { formateCurrency } from "../scripts/utils/money.js";

console.log('test suit: formate Currency');

console.log('converts cents into dollar')

if (formateCurrency(2095) === '20.95'){  // basic test cases
  console.log('passed')
} else {
  console.log('failed')
}

console.log('rounds upto nearest cents')

if (formateCurrency(2000.5)=== '20.01'){ // edge test cases
  console.log('passed')
} else{
  console.log('shitt-filed')
}