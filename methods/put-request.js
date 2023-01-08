const requestBodyParser = require("../util/body-parser");  // body-parser module created in util folder
const writeToFile = require('../util/write-to-file');  // to write and save the data in movies.json file

module.exports = async (req, res) => {
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
     //if id is valid
    else if ((baseUrl === '/api/movies/') && (regexV4.test(id))) {
        try {
            let body = await requestBodyParser(req); // saving the parsed movie data i body

            const index = req.movies.findIndex((movie) => { // saving the index of 
                return movie.id === id; // returing the index of movie with given id
            });
            //if movie is not present
            if (index === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found", message: "Movie not found." }));
                res.end();
            }
            //if movie is present
            else {
                req.movies[index] = {...body, id};
                writeToFile(req.movies);
                res.writeHead(200 , { "Content-Type": "application/json" });
                res.end(JSON.stringify(req.movies));
            }
            //if any error occurred
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not found",
                })
            );
        }
    }
        //if given route is wrong
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found." }));
    }
}