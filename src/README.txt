NPM + node
need to have node.js and npm installed.
* run 'npm install' in src directory (where the app.js is). 
 - Need to do only once. Should create node_modules directory
* Backend ja front are separate.
* First need to start backend (uses mongo)
 - start mongo normally
 - node server.js
	- should get announcement that port is 3000 and connection to db is succesfull
* Front end can be started with
 - node app.js
	- should get announcement that service is started at port 3001
*after that service can be found at localhost:3001