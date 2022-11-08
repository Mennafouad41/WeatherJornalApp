/* Global Variables */

let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '5099655413602187b944a2c5c3fbc22f';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear

/////////////////////////////////////////////////////////////////////////
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
const UInfo = document.getElementById('userInfo');

//event listener function
function performAction(e) {
    const code = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getTEMPData(baseUrl, code, apiKey)
        .then(function(data) {
        postData('/add', { temp: convertKToC(data.main.temp), date: newDate, content: content });
        }).then(function() {
                updateUI()
         }).catch(function(error) {
                console.log(error);

        });
      UInfo.reset();
}

//Function to GET API Data
const getTEMPData = async(baseUrl, code, apiKey) => {
    // res equals to the result of fetch function
    const response = await fetch(`${baseUrl}?q=${code}&appid=${apiKey}`);
    try {
        // data equals to the result of fetch function
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

//Function to POST API data 
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error', error);
    }
};

// Update user interface
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};
//Convert from Kelvin to Celsius
function convertKToC(kelvin) {
    if (kelvin < (0)) {
        return '0 K';
    } else {
        c=kelvin - 273.15;
        return c;
    }
}