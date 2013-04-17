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
	 * Use the _action param to decide what to do next
	 */
	switch (params.query._action)
	{
		/**
		 * If the requested action is "sendData" execute the following code
		 */
		case 'sendData':
			/**
			 * Set content type to text/json
			 */
			contentType = 'text/json';
			
			/**
			 * Bind to the data event chunk is the request data object
			 */
			request.on('data', function(chunk) {

				/**
				 * Initialize output object
				 */
				outputObj = {
					success: true
				};

				/**
				 * Get data and clean up if necessary. chunk is an Buffer object so we need to call toString to get the query data to parse.
				 */	
				data = querystring.parse(chunk.toString('utf8'));
				tiltLR = data.tiltLR;
				tiltFB = data.tiltFB;
				motionUD = data.motionUD;
				dir = data.dir;
				controllerId = data.controllerId

				/**
				 * Create object containing cleaned data for output
				 */
				outputObj.data = {}
				outputObj.data.x = tiltLR;
				outputObj.data.y = tiltFB;
				outputObj.data.dir = dir;
				outputObj.controllerId = controllerId;

				/**
				 * Convert output object to json string
				 */
				output = JSON.stringify(outputObj);

				/**
				 * Log output to console
				 */
				console.log(output);

				/**
				 * Output content type
				 */
				response.writeHead(200, {
					'Content-Type': contentType
				});

				/**
				 * Output content body
				 */
				response.write(output);

				/**
				 * Response completed
				 */
				response.end();
			});
			break;

			/**
			 * If not action is specified serve up the html file.
			 */
		default:
			output = fs.readFileSync(process.cwd() + '/html/main.html');			
			output = output.toString().replace(/\{CONTROLLER_ID\}/, Math.floor(Math.random()*999999));
			response.writeHead(200, {
				'Content-Type': contentType
			});
			response.write(output);

			response.end();
			break;
	}






}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
