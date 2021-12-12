const http = require('http');
const fs = require('fs');
const birds = require('./birds.json');
var mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 9876;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "animals"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  
});


const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === "GET"){    // Route
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.readFile(__dirname + '/html/welcome.html', (err, data) => {
            res.end(data);
        });
    
    }
    else if(req.url === "/content" && req.method === "GET"){  // Route
        res.writeHead(200, {"Content-Type":"text/html"});
        var htmlContent = `
                <h1> Birds </h1>
        `;
        birds.data.map(bird=>{
            console.log(bird.name);
            htmlContent += `
            <div>
                <h5> ${bird.name}</h5>
                <h5> ${bird.age}</h5>
                <h5> ${bird.weight}</h5>
                <h5> ${bird.favoriteFood}</h5>
            </div>
            <hr/>
            `;
        });
        htmlContent += `<h1>Animals</h1>`;
        birds.data.map(bird=>{
            console.log(bird.name);
            htmlContent += `
            <div>
                <h5> ${bird.name}</h5>
                <h5> ${bird.age}</h5>
                <h5> ${bird.weight}</h5>
                <h5> ${bird.favoriteFood}</h5>
            </div>
            <hr/>
            `;
        });




        var sql = `select * from animals`;
        var animalsData;
        con.query(sql, function (err, result){
            if (err){
                throw err;
            } 
            else{
                result.map(animal=>{    
                    htmlContent += `
                    <div>
                        <h5> ${animal['name']}</h5>
                        <h5> ${animal["type"]}</h5>
                        <h5> ${animal["age"]}</h5>
                        <h5> ${animal["weight"]}</h5>
                        <h5> ${animal["favoriteFood"]}</h5>
                    </div>
                    <hr/>
                    `;
                });
                htmlContent += "<h1>end</h1>";
                res.end(htmlContent);
            }

        });
         

    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});