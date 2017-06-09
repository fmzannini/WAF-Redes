var http = require('http'),
    fs = require('fs');

function serve(ip, port) {
  fs.readFile('server.html', function (err, html) {
      if (err) {
          throw err;
      }
      http.createServer(function(request, response) {
          response.writeHeader(200, {"Content-Type": "text/html"});
          response.write(html);
          response.end();
      }).listen(port, ip);
    });
}

serve ("0.0.0.0", 80);
