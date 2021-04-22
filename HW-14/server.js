var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   console.log(pathname);
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");

   fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
       console.log(err);
       
       // HTTP Status: 404 : NOT FOUND
       // Content Type: text/plain
       response.writeHead(404, {'Content-Type': 'text/html'});
    } else {	
       //Page found	  
       // HTTP Status: 200 : OK
       // Content Type: text/plain
       response.writeHead(200, {'Content-Type': 'text/html'});	
       
       // Write the content of the file to response body
       response.write(data.toString());		
    }
    
    // Send the response body 
    response.end();
 });   
   
   const queryObject = url.parse(request.url, true).query;
   if(pathname == "/index2.html")
   {
        console.log("made it to page 2");
        readQueryString(queryObject);
   }

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

function readQueryString(queryObject) {
  
    // access all the queryString variables
    if (queryObject != null) {
       let name = queryObject.name;
       if (name != undefined) {
          // change the file
          updateFile(name);
       }
      
    }
 }

function updateFile(name)
{
    var fs = require("fs");
    var data = name;

    // Create a writable stream
    var writerStream = fs.createWriteStream('output.txt');

    // Write the data to stream with encoding to be utf8
    writerStream.write(data,'UTF8');

    // Mark the end of file
    writerStream.end();

    // Handle stream events --> finish, and error
    writerStream.on('finish', function() {
    console.log("Write completed.");
    });

    writerStream.on('error', function(err) {
    console.log(err.stack);
    });

    console.log("Program Ended");

}