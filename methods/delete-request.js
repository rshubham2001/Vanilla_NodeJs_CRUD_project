const writeToFile = require("../util/write-to-file");  // to write and save the data in movies.json file

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);  //base url of the URL
    let allAPI = req.url.split('/');  // it will give us array of all APIs seperated by  '/'
    let id = allAPI[3];  // id of the movie will be at 3 index in allAPI array

     //creating regex for checking the given id is valid or not
    const regexV4 = new RegExp(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i);
    
    // if id is not valid
    if (!(regexV4.test(id))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid." }));
    }
    // if id is valid
    else if ((baseUrl === '/api/movies/') && (regexV4.test(id))) {
        res.setHeader('Content-Type', "application/json");
        const index = req.movies.findIndex((movie) => {
            return movie.id === id;
        });
        //if movie with given id is not present
        if (index === -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found." }));
            res.end();
        }
        // if movie with given id is present
        else {
            req.movies.splice(index, 1);  //removing the movie at given index from req.movies
            writeToFile(req.movies);  // writing the remaing movies in movies.json
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies));
        }
    }
        //if route is wrong
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found." }));
    }
}