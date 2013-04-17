var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  
  var params = url.parse(request.url, true);
  
  response.write('Value of parameter foo = ' + params.query.foo);
  
  response.end();
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');