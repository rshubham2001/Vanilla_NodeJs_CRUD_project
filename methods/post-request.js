const crypto = require("crypto");  // module for generating unique ID for each movie
const requestBodyParser = require("../util/body-parser");  // body-parser module created in util folder
const writeToFile = require('../util/write-to-file');  // to write and save the data in movies.json file

module.exports = async (req, res) => {   //exporting the module to the server.js
    if (req.url === '/api/movies') {   //checking the url
        try {
            let body = await requestBodyParser(req);  // storing the parsed movie data in body

            body.id = crypto.randomUUID(); // assinging each movie unique id

            req.movies.push(body);  // pushing the body in the req.movies

            writeToFile(req.movies);  // writing the req.movies in movies.json file

            res.writeHead(201, { 'Content-Type': "application/json" });

            res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            
            res.end(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not found",
                })
            );
        };
    } 
    // if the request url is wrong
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({title:"Not Found", message: "Route not found." }))
    }
}