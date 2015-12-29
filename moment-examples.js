var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X')); // Unix Timestamp
// console.log(now.valueOf()); // Unix Millisecond Timestamp

var timestamp = 1451374646623;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format("h:mma"));

// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format("MMM Do YYYY, h:mma")); // Dec 5th 2015, 6:45am