# Vanilla_NodeJs_CRUD_project
This is NodeJs CRUD Movie databse project.
Main function is in server.js file.
data folder contains the movies.json file which store all the the data of movies.
methds folder conatins all the js file of all methods(get, post,put,delete).
util folder conatins the module (body-parser, and write-to-file).
Here we have created our own body parser beause we are not using express.js
write-to-file.js is used to save the updated data in the movie.json.

We can add new movie and its deatils using POST requst,
GET request can be used to show all the movie presen in the file or a specific  movie if we request wit a unique id,
All movie have their unique id which is geerated using crypto module of NodeJs
DELETE request can be used to delete a specific movie with given id,
PUT request can be used to update the detailsof a movie.
