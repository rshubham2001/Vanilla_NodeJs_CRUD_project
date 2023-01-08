module.exports = (req, res) => {   //exporting the module to server.js
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);  //base url of the URL
    let allAPI = req.url.split('/');  // it will give us array of all APIs seperated by  '/'
    let id = allAPI[3];  // id of the movie will be at 3 index in allAPI array

    //creating regex for checking the given id is valid or not
    const regexV4 = new RegExp(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i);
    
    if (req.url === '/api/movies') { //with base url it will show all the movie present in movie.json

        res.statusCode = 200;  // status code

        //setting up header
        res.setHeader('Content-Type', "application/json");

        // wrint the movie data
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    // if the id is not valid
    else if (!(regexV4.test(id))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid." }));
    }
        //if the id is valid and the base url is also valid
    else if ((baseUrl==='/api/movies/') && (regexV4.test(id))) {
        res.setHeader('Content-Type', "application/json");
        let filteredmovie = req.movies.filter((movie) => {
            return movie.id === id;
        });

        //if movie with given id is present
        if (filteredmovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredmovie));
            res.end();
        }
        // if movie with given id is not present
        else {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found." }));
            res.end();
        }
    }
     // if the requested route is incorrect  
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found." }));
    }
}