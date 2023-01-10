import http from 'http';

const PORT = 3333;

const server = http.createServer((req, res) => {
    let apiPath = req.url.substring(1, req.url.length);
    console.log(apiPath);
    switch (req.method) {
        case 'GET':
            if (apiPath.split('/').length === 2) {
                console.log('GET api/users');
            }
            else if (apiPath.split('/').length === 3) {
                console.log(`GET api info about user ${apiPath.split('/')[2]}`);
            }
            else {
                console.log('GET route error');
            }
            break;
        case 'POST':
            switch (apiPath) {
                case 'api/users':
                    console.log('POST api/users');
                    break;
                default:
                    console.log('POST route error');
            };
            break;
        case 'PUT':
            switch (apiPath) {
                case 'api/users/{userId}':
                    console.log('PUT api/users/{userId}');
                    break;
                default:
                    console.log('PUT route error');
            };
            break;
        case 'DELETE':
            switch (apiPath) {
                case 'api/users/${userId}':
                    console.log('DELETE api/users/${userId}');
                    break;
                default:
                    console.log('DELETE route errror');
            };
            break;
        default:
            console.log('never');
    }
});

server.listen(PORT, () => { });
