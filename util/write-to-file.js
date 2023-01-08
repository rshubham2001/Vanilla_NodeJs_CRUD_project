const fs = require("fs");  // importing the fs module
const path = require("path");  // importing the path module

module.exports = (data) => {  // exporting this module
    try {
        // writing into movies.json synchronously
        fs.writeFileSync(
            path.join(   // joining the path of the movies.json file
                __dirname,    // base directory name 
                "..",     // moving out of the util folder
                "data",   // moving to data folder
                "movies.json"),  // movies.jason file
            JSON.stringify(data), // converting the data into string from json
            "utf-8");  //character encoding
    } catch (err) {
        console.log(err); 
    }
}