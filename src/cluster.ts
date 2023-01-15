import cluster from "cluster";
import { createServer, IncomingMessage, ServerResponse } from "http";
import * as os from 'os';
import * as dotenv from 'dotenv';
import { addUserController, deleteUser, getAllUsersController, getOneUserController, modifyUserController } from "./controllers";
import { IUserSubData } from "./inerfaces";
import { chechIsUUID } from "./utils";

dotenv.config();

let ix = 0;

if (cluster.isPrimary) {   
    let cpus = os.cpus().length;    
    var pidToPort = {};
    let nPort: number = +process.env.PORT! || 5000;
    var worker;
    for (var i = 0; i < cpus; i++) {
        nPort = nPort + 1;       
        worker = cluster.fork({ port: nPort });        
        pidToPort[worker.process.pid] = nPort;
        process.env.PORT = (nPort)+'';
    }
    cluster.on('exit', function (worker, code, signal) {     
        console.log('worker ' + worker.process.pid + ' died');
    });   
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
                        getAllUsersController().then((data)=>{
                            response.end(JSON.stringify( data ));
                        }) 
                        
                    }
                    else {
                        if (!chechIsUUID(apiPath[3])) {
                            response.statusCode = 400;
                            response.end('Enterned userId is not valid UUID');
                        }
                        else {
                            getOneUserController(apiPath[3]).then((data)=>{
                                if (data.id === '-1') {
                                    response.statusCode = 404;
                                    response.end(`User with id = ${apiPath[3]} not found`)
                                } else {
                                    response.statusCode = 200;
                                    response.end( JSON.stringify(data))
                                }
                            })
                           
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
                        addUserController({
                            id: '',
                            username: reqData.username,
                            age: reqData.age,
                            hobbies: splittedHobbies
                        }).then((dat)=>{
                            response.end(JSON.stringify(dat))
                        });      
                         
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
                            deleteUser(apiPath[3]).then((dat)=>{
                                response.statusCode = dat;
                                response.end();
                            });                             
                        }      
                              
                        break;
                default: console.log('Never');
            }
        }
    });    
    server.listen(process.env.PORT, () => {
        console.log(`Serve at port [${+process.env.PORT }`);        
    });
}