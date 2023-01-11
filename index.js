import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
    const validAPI = '/api/users';
    switch (req.method) {
        case 'GET':
            if (req.url === validAPI) {
                console.log('GET api/users');
                res.statusCode = 200;
                res.end();
            }
            else if (req.url.indexOf(`${validAPI}/`) !== -1) {
                let requestUserId = req.url.split('/')[3];
                console.log(`GET api info about user ${requestUserId}`);
                res.statusCode = 200;
                res.end();
            }
            else {
                res.statusCode = 404; //400
                res.end();
                console.log('GET route error');
            }
            break;
        case 'POST':
            if (req.url === validAPI) {
                console.log('POST api/users');
                res.statusCode = 201;
                res.end();
            }
            else {
                res.statusCode = 400;
                res.end();
                console.log('POST route error');
            }
            break;
        case 'PUT':
            if (req.url.indexOf(`${validAPI}/`) !== -1) {
                console.log('PUT api/users/{userId}');
                res.statusCode = 200;
                res.end();
            } else {
                res.statusCode = 404; //400
                res.end();
                console.log('PUT route error');
            }
            break;
        case 'DELETE':
            if (req.url.indexOf(`${validAPI}/`) !== -1) {
                console.log('DELETE api/users/${userId}');
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 404; //400
                res.end();
                console.log('DELETE route errror');
            }              
            break;
        default:
            console.log('never');
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
