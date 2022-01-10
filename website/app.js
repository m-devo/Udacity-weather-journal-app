/* Global Variables */
const generateButton = document.querySelector("#generate")
// Personal API Key for OpenWeatherMap API
const apiKey ="444d026b151888f0d4baa4954c0d3097"

// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e){
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    const zipCode = document.querySelector("#zip").value
    const feelings = document.querySelector("#feelings").value
    const qURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
    if(!zipCode){
        alert("Please enter ZIPCODE");
    } 
    /*if (zipCode) { 
      alert("Thank You")
    }*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    getWeatherData(qURL)
    .then(function (data){
        postData('/postWeatherData', {temp:data.main.temp, date: newDate, feelings:feelings} )

    .then(function(){
         updateUI ()
    })    

    })  
};
/* Function to GET Web API Data*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
//Udacity
const getWeatherData = async function(qURL){
        const response = await fetch(qURL)
        //console.log(response);
        try {
            const data = await response.json();
            //console.log(data);
            return data;
        }
        catch(error) {
            console.log('error', error);
        }
    };
/* Function to POST data */
const postData = async function( url = '', data = {}){
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },     
      body: JSON.stringify(data), 
      /*
      temp:data.main.temp,
      date: newDate, 
      feelings:feelings
      */
    })

      try {
        const newData = await response.json()
        //console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };
/* Function to GET Project Data */
//updateUI
const updateUI = async function() {
    const request = await fetch('/getWeatherData');
    try{
      const all = await request.json();
      document.querySelector('#date').innerHTML = all.date;
      document.querySelector('#temp').innerHTML = all.temp;
      document.querySelector('#content').innerHTML = all.feelings;
  
    }catch(error){
      console.log("error", error);
    }
  };
  