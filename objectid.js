//  _id: "62f3a216d919cf8c871d8150"

// 12 bytes
  // 4bytes: timestamp
  // 3 bytes: machine identifier
  // 2 bytes: process identifier
  // 3bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256 bits
// 3 ^ 24 = 16M bits  

// Driver -> MongoDB

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid)