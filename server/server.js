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
            if (request.method == 'GET') {
                var url = require('url').parse(request.url);
                if (url.pathname == '/notes') {
                  var filter = getParameterByName("notes", request.url);
                  console.log(filter);
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
                    parsedBody = JSON.parse(body);
                    switch (request.url) {
                        case '/add_note':
                            orm.query("INSERT INTO notes(note) values( '" + parsedBody.note + "');").then(function () {
                                response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                                response.write(parsedBody.note);
                                response.end();
                            });
                            break;

                        case '/notes':
                            orm.query("SELECT * FROM notes WHERE note LIKE '%" + parsedBody.search + "%';").then(function (values) {
                                response.writeHeader(200, {"Content-Type": "application/json"});
                                response.write(JSON.stringify(values[0], null, 2));
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


/*

function serve(ip, port) {
    var db = pgp('postgres://postgres:postgres@localhost:5432/mydb');

    app.listen(ip, port);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/', function(req, res){
        res.render('server.html');
    });

    app.post('/add_note', function(req, res){
        db.none("INSERT INTO notes values(" + req.body.note + ")").then(function () {
            res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            res.end();
        }).catch(function (err) {
            return next(err);
        });
    });

    app.post('/notes', function(req, res){
        db.many("SELECT * FROM notes WHERE note LIKE '%" + req.body.search + "%'").then(function (values) {
            res.writeHeader(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(values[0], null, 2));
            res.end();
        }).catch(function (err) {
            return next(err);
        });
    });

}

*/







/*


var http = require('http'),
    fs = require('fs'),
    Sequelize = require('sequelize'),
    querystring = require('querystring');

function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}

function serve(ip, port) {
    fs.readFile('server.html', function (err, html) {
        if (err) {
            throw err;
        }

        var db = new Sequelize('postgres://postgres:postgres@localhost:5432/mydb', {
            logging: true
        });

      // db.sync().then(function (orm) {
      //   http.createServer(function(request, response) {
      //     var myparam = "'asd'; SELECT * FROM pg_catalog.pg_tables";


      //     orm.query("insert into mytable values(" + Math.random().toString() + ")").then(function () {
      //       orm.query("SELECT * FROM mytable WHERE name=" + myparam + ";").then(function (values) {
      //       // orm.query("select * from mytable").then(function (values) {
      //         response.writeHeader(200, {"Content-Type": "application/json"});
      //         response.write(JSON.stringify(values[0], null, 2));
      //         response.end();
      //       });
      //     });
      //   }).listen(port, ip);
      // });

        db.sync().then(function (orm) {
            http.createServer(function(request, response) {
                switch (request.url) {
                    case '/add_note':
                        processPost(request, response, function() {
                            orm.query("INSERT INTO notes values(" + request.post.note + ")").then(function () {
                                response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                                response.end();
                            });
                        });

                        break;

                    case '/notes':
                        processPost(request, response, function() {
                            orm.query("SELECT * FROM notes WHERE note LIKE '%" + request.post.search + "%'").then(function (values) {
                                response.writeHeader(200, {"Content-Type": "application/json"});
                                response.write(JSON.stringify(values[0], null, 2));
                                response.end();
                            });
                        });

                    default:
                        response.writeHeader(200, {"Content-Type": "text/html"});
                        response.write(html);
                        response.end();
                }
            }).listen(port, ip);
        });
    });

}

*/
serve ("0.0.0.0", 80);
