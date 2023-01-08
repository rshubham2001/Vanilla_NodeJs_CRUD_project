const http = require('http');  // importing http module
const getReq = require("./methods/get-request");         // importing get-request module
const postReq = require("./methods/post-request");       // imorting post-request module
const putReq = require("./methods/put-request");         // importing put-request module
const deleteReq = require("./methods/delete-request");   // importing delete-request module

let movies = require("./data/movies.json");              // importing movies.json file
const PORT = process.env.PORT || 5000;                   // setting up port

//creating server
const server = http.createServer((req, res) => {
    req.movies = movies;  // creating a new property of request and assinging it the mmovies.json 
    switch (req.method) {
        case "GET":       //get method
            getReq(req, res);
            break;
        case "POST":      //post method
            postReq(req, res);
            break;
        case "PUT":       //put method
            putReq(req, res);
            break;
        case "DELETE":    //delete method
            deleteReq(req, res);
            break;
        default:          //default method
            res.statusCode = 400;     //setting status of HTTP request.
            res.setHeader('Content-Type', "application/json");  //setting up header
            res.write(JSON.stringify({title:"Not Found", message: "Route not found." }));
            res.end();
    }

});
 
// listining on port 5000
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
}); 
