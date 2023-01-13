import cluster from "cluster";
import { createServer, IncomingMessage, ServerResponse } from "http";
import * as os from 'os';
import * as dotenv from 'dotenv';
import { addUserController, deleteUser, getAllUsersController, getOneUserController, modifyUserController } from "./controllers";
import { IUserSubData } from "./inerfaces";
import { chechIsUUID } from "./utils";

dotenv.config();


if (cluster.isPrimary) {   
    let cpus = os.cpus().length;    
    var pidToPort = {};
    let nPort: number = +process.env.PORT! || 5000;
    var worker;
    for (var i = 0; i < cpus; i++) {
        nPort = nPort + 1;
        worker = cluster.fork({ port: nPort });
        pidToPort[worker.process.pid] = nPort;
    }

    console.log(pidToPort);

    cluster.on('exit', function (worker, code, signal) {     
        console.log('worker ' + worker.process.pid + ' died');
    });
    let s: string =  Object.values(pidToPort).join(' ');  
    console.log(`Serve at ports ${s}`)
} else {  
    const server = createServer((request: IncomingMessage, response: ServerResponse) => {
        let apiPath: string[] = request.url!.split('/');
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
                        response.end(JSON.stringify( getAllUsersController() ));
                    }
                    else {
                        if (!chechIsUUID(apiPath[3])) {
                            response.statusCode = 400;
                            response.end('Enterned userId is not valid UUID');
                        }
                        else {
                            if (getOneUserController(apiPath[3]).id === '-1') {
                                response.statusCode = 404;
                                response.end(`User with id = ${apiPath[3]} not found`)
                            } else {
                                response.statusCode = 200;
                                response.end( JSON.stringify(getOneUserController(apiPath[3])))
                            }
                        }
                    }
                    break;
    
                case 'POST':
                    let requestBody = new URL(`http://localhost:4000/${request.url}`).searchParams;
    
                    let reqData:IUserSubData = { id:'', username:'', age:1, hobbies: ''} ;       
    
                    for (const [key, value] of requestBody) {
                        reqData[key] = value;
                    }          
                    let splittedHobbies = reqData.hobbies.split('[')[1].split(']')[0].split(',');                
                    if ( reqData['username'] && reqData['age'] && reqData['hobbies'] ) {
                        response.statusCode = 200;
                        response.end(JSON.stringify(addUserController({
                            id: '',
                            username: reqData.username,
                            age: reqData.age,
                            hobbies: splittedHobbies
                        })))                    
                    } else {
                        response.statusCode = 400;
                        response.end('Request body does not contain required fields');
                    }
                    
                    break;
                case 'PUT':
                    modifyUserController('', { username: 'QQQ', age: 1, hobbies: [] })
                    break;
                case 'DELETE':
                    if ( !chechIsUUID(apiPath[3]) ) {
                        response.statusCode = 400;
                        response.end('Enterned userId is not valid UUID');
                    }   
                    else {
                        response.statusCode = deleteUser(apiPath[3]); 
                        response.end();
                    }      
                          
                    break;
                default: console.log('Never');
            }
        }
    });    
    server.listen(process.env.PORT, () => {
        console.log(`Serve at ports [${process.env.PORT } - ${+(process.env.PORT!)+os.cpus().length}]`)
    });
}