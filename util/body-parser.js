module.exports = async (request) => {   // exporting the module
    return new Promise((resolve, reject) => {   // it will return a promise
        try {
            let body = "";
            request.on("data", (chunk) => {
                body += chunk;
            });
            request.on("end", () => {
                resolve(JSON.parse(body));
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

// this will return the request object after parsing.