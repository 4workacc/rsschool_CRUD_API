"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = require("http");
const dotenv = __importStar(require("dotenv"));
const controllers_1 = require("./controllers");
const url_1 = require("url");
const utils_1 = require("./utils");
dotenv.config();
const validAPI = '/api/users';
exports.server = (0, http_1.createServer)((request, response) => {
    let apiPath = request.url.split('/');
    console.log(apiPath);
    if (!(apiPath[1] === 'api') || !(apiPath[2].split('?')[0] === 'users')) {
        response.statusCode = 404;
        response.end('Request is not valid endpoint');
    }
    else {
        switch (request.method) {
            case 'GET':
                if (request.url === '/api/users') {
                    response.statusCode = 200;
                    (0, controllers_1.getAllUsersController)().then((data) => {
                        response.end(JSON.stringify(data));
                    });
                }
                else {
                    if (!(0, utils_1.chechIsUUID)(apiPath[3])) {
                        response.statusCode = 400;
                        response.end('Enterned userId is not valid UUID');
                    }
                    else {
                        (0, controllers_1.getOneUserController)(apiPath[3]).then((data) => {
                            if (data.id === '-1') {
                                response.statusCode = 404;
                                response.end(`User with id = ${apiPath[3]} not found`);
                            }
                            else {
                                response.statusCode = 200;
                                response.end(JSON.stringify(data));
                            }
                        });
                    }
                }
                break;
            case 'POST':
                let requestBody = new url_1.URL(`http://localhost:4000/${request.url}`).searchParams;
                let reqData = { id: '', username: '', age: 1, hobbies: '' };
                for (const [key, value] of requestBody) {
                    reqData[key] = value;
                }
                let splittedHobbies = reqData.hobbies.split('[')[1].split(']')[0].split(',');
                if (reqData['username'] && reqData['age'] && reqData['hobbies']) {
                    response.statusCode = 200;
                    (0, controllers_1.addUserController)({
                        id: '',
                        username: reqData.username,
                        age: reqData.age,
                        hobbies: splittedHobbies
                    }).then((dat) => {
                        response.end(JSON.stringify(dat));
                    });
                }
                else {
                    response.statusCode = 400;
                    response.end('Request body does not contain required fields');
                }
                break;
            case 'PUT':
                let requestBody1 = new url_1.URL(`http://localhost:4000/${request.url}`).searchParams;
                let reqData1 = { id: '', username: '', age: 1, hobbies: '' };
                for (const [key, value] of requestBody1) {
                    reqData1[key] = value;
                }
                let userID = reqData1['id'];
                let userUsername = reqData1['username'] || 'XXX';
                let userAge = reqData1['age'] || -1;
                let userHobbies = reqData1['hobbies'] || [];
                console.log(userID);
                if (!(0, utils_1.chechIsUUID)(userID)) {
                    response.statusCode = 400;
                    response.end('Enterned userId is not valid UUID');
                }
                else {
                    (0, controllers_1.modifyUserController)(userID, { username: userUsername, age: userAge, hobbies: [...userHobbies] }).then((data) => {
                        if (data.id === '-123') {
                            response.statusCode = 404;
                            response.end('User not found');
                        }
                        else {
                            response.statusCode = 200;
                            response.end(JSON.stringify(data));
                        }
                    });
                }
                break;
            case 'DELETE':
                if (!(0, utils_1.chechIsUUID)(apiPath[3])) {
                    response.statusCode = 400;
                    response.end('Enterned userId is not valid UUID');
                }
                else {
                    (0, controllers_1.deleteUser)(apiPath[3]).then((dat) => {
                        response.statusCode = dat;
                        response.end();
                    });
                }
                break;
            default: console.log('Never');
        }
    }
});
exports.server.listen(process.env.PORT, () => {
    console.log(`Serve at port ${process.env.PORT || 4011}`);
});
/*

const server = http.createServer((req, res) => {
    switch (req.method) {
      
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
      
});

*/ 
//# sourceMappingURL=index.js.map