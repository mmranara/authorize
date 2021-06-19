

var client = require('twilio')(
    'ACcc90b2082a8b8dac1caf4497e5826e7a',
    '4c7fe81f0c8f549b14aadb9b19bd3ad8'
  );

  client.messages.create({
    from: '(435) 241-3632',
    to: '+639955690227',
    body: "Lezz goo"
  }).then((message) => console.log(message.sid));