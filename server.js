// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080
const server = app.listen(port, () => {
    console.log(`The sever is running on port ${port}`);
})
//Get ROUTE
app.get('/getWeatherData', getWeatherData);

function getWeatherData (request, response) {
  response.send(projectData);
};
 //POST ROUTE

 app.post('/postWeatherData', postWeatherData);

function postWeatherData (request, response){
    projectData.temp=request.body.temp
    projectData.date=request.body.date
    projectData.feelings = request.body.feelings
    response.send({ status: 'ok'})
}