// Required for server
var http = require('http');

// Required for request parameter handling
var url = require('url');

// Required for loading of html document to serve up
var fs = require('fs');

//Used to parse the query string formatted data recieved by the HTTP POST request
var querystring = require('querystring');

/**
 * Create node JS server using the http class
 */
http.createServer(function(request, response) {

	/**
	 * Get and parse params from request object
	 * @type @exp;url@call;parse
	 */
	var params = url.parse(request.url, true);

	/**
	 * Default content type is text/html
	 */
	contentType = 'text/html';

	/**
	 * Use the params.query._action property to decide what to do next. We can use a switch statement to achieve this
   * as follows:
   * 
   * switch(params.query._action) {
   *    case 'sendData':
   *      // Send data code goes here
   *    break;
   *    
   *    default:
   *      // This code will be executed if no params.query._action is found.
   *    break;
   * }
	 */

  /**
   * If the requested action is "sendData" 
   * parse the data, we need to use the request.on("data", callback(dataBuffer)) event to deal with the posted data
   * The data will be passed through to the callack function as a Buffer object we can
   * extract the data using the querystring.parse(chunk.toString('utf8')) method.
   * 
   * We need to output the data as a json string, we can create the string from a javascript object using the
   * JSON.stringify method. We then need to set the Content-Type response header to text/json
   * 
   * This is where any communication with the tilt hardware will be implemented.
   * 
   * If the requested action is undefined we need to just serve up the html file
   * 
   * We need to use the fs.readFileSync([PATH]) method to get the data from the html file.
   * this can be passed directly to the reponse.write method, we need to make sure the Content-Type response header 
   * is set to text/html
   * 
   * Make sure the response.end() method is called after the response has been set up.
   * 
   */

}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
