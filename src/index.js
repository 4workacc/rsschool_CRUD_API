import http from 'http';
import * as dotenv from 'dotenv';
import { deleteUser, getAllUsers, getCurrentUser, putUser, updateUser } from './utils/utils.js';
import { URL } from 'url';

dotenv.config();

const server = http.createServer((req, res) => {
    const validAPI = '/api/users';
    switch (req.method) {
        case 'GET':
            if (req.url === validAPI) {
                console.log('GET api/users');
                res.statusCode = 200;
                res.end(JSON.stringify({ 'users': getAllUsers() }));
            }
            else if (req.url.indexOf(`${validAPI}/`) !== -1) {
                let requestUserId = req.url.split('/')[3];
                if (requestUserId !== '') {
                    console.log(`GET api info about user ${requestUserId}`);
                    let user = getCurrentUser(requestUserId);
                    console.log('!!!', user)
                    if (user.id === -1) {
                        res.statusCode = 404;
                        res.end();
                    }
                    else {
                        res.statusCode = 200;
                        res.end(JSON.stringify({ user }))
                    }
                } else {
                    console.log(`GET api ERROR: invalid userID`);
                    res.statusCode = 400;
                    res.end();
                }
            }
            else {
                res.statusCode = 404; //400
                res.end();
                console.log('GET route error');
            }
            break;
        case 'POST':
            if (req.url.indexOf(validAPI) !== -1) {
                console.log('POST api/users');
                let reqParams = new URL(`http://localhost:4000${req.url}`).searchParams;
                let reqData = {};
                for (const [key, value] of reqParams) {
                    reqData[key] = value;
                }
                if (putUser(reqData).id !== -1) {
                    res.statusCode = 201;
                    res.end();
                } else {
                    res.statusCode = 400;
                    console.log('POST error: enterning data not complete');
                    res.end();
                }

            }
            else {
                res.statusCode = 400;
                res.end();
                console.log('POST route error');
            }
            break;
        case 'PUT':
            if (req.url.indexOf(`${validAPI}/`) !== -1) {
                let reqParams = new URL(`http://localhost:4000${req.url}`).searchParams;
                let reqData = {};
                for (const [key, value] of reqParams) {
                    reqData[key] = value;
                }
                console.log('PUT api/users/{userId}');
                console.log(reqData);
                let userId = req.url.split('/')[3].split('?')[0];
                if (userId) {
                    console.log(updateUser(userId, reqData));
                    res.statusCode = 200;
                    res.end();
                }

            } else {
                res.statusCode = 404; //400
                res.end();
                console.log('PUT route error');
            }
            break;
        case 'DELETE':
            if (req.url.indexOf(`${validAPI}/`) !== -1) {
                let userId = req.url.split('/')[3].split('?')[0];               
                console.log('DELETE api/users/${userId}');
                res.statusCode = deleteUser(userId);;
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
