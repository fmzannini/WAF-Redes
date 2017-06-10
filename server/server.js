var http = require('http'),
    fs = require('fs'),
    Sequelize = require('sequelize');

function serve(ip, port) {
  fs.readFile('server.html', function (err, html) {
      if (err) {
          throw err;
      }

      var db = new Sequelize('postgres://postgres:postgres@localhost:5432/mydb', {
        logging: true
      });

      db.sync().then(function (orm) {
        http.createServer(function(request, response) {
          var myparam = "'asd'; SELECT * FROM pg_catalog.pg_tables";


          orm.query("insert into mytable values(" + Math.random().toString() + ")").then(function () {
            orm.query("SELECT * FROM mytable WHERE name=" + myparam + ";").then(function (values) {
            // orm.query("select * from mytable").then(function (values) {
              response.writeHeader(200, {"Content-Type": "application/json"});
              response.write(JSON.stringify(values[0], null, 2));
              response.end();
            });
          });
        }).listen(port, ip);
      });
    });
}

serve ("0.0.0.0", 80);
