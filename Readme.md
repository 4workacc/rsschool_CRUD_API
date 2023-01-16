start: npm install

commands: 
1. npm run start:dev - development build managed by nodemon. Live restart with changind some files
2. npm run start:prod - build JS files and start project
3. npm run start:multi - start at development mode project with clusters. Count of clusters equal count of cores. Working ports is writen at console
4. npm run test - start mocha testing

All userbase info saved as JSON file at ./src/db