const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, function() {
  console.log(`\n *** API is running on localhost:${PORT} *** \n`);
});
