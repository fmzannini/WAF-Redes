var http = require('http'),
    fs = require('fs'),
    Sequelize = require('sequelize');


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function serve(ip, port) {
  fs.readFile('server.html', function (err, html) {
      if (err) {
          throw err;
      }

      var db = new Sequelize('postgres://postgres:postgres@localhost:5432/mydb', {
          logging: false
      });

      db.sync().then(function (orm) {
          http.createServer(function(request, response) {
            if (request.method === 'OPTIONS') {
                  var headers = {};
                  // IE8 does not allow domains to be specified, just the *
                  // headers["Access-Control-Allow-Origin"] = req.headers.origin;
                  headers["Access-Control-Allow-Origin"] = "*";
                  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
                  headers["Access-Control-Allow-Credentials"] = false;
                  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
                  headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
                  response.writeHead(200, headers);
                  response.end();
            }
            if (request.method == 'GET') {
                var url = require('url').parse(request.url);
                if (url.pathname == '/notes') {
                  var filter = getParameterByName("notes", request.url);
                  orm.query("SELECT * FROM notes WHERE note LIKE '%"+ filter + "%';").then(function (values) {
                      response.writeHeader(200, {"Content-Type": "application/json"});
                      response.write(JSON.stringify(values[0], null, 2));
                      response.end();
                  });
                } else {
                  response.writeHeader(200, {"Content-Type": "text/html"});
                  response.write(html);
                  response.end();
                }
            }
            if (request.method == 'POST') {
                var body = '';
                request.on('data', function (data) {
                    body += data;
                });
                request.on('end', function () {
                  console.log(request);
                    switch (request.url) {
                        case '/add_note':
                            orm.query("INSERT INTO notes(note) values( '" + body.split("=")[1] + "');").then(function () {
                                response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                                response.end();
                            });
                            break;
                    }
                });
            }

        }).listen(port, ip);
      });
    });
}
serve ("0.0.0.0", 80);
