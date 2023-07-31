/*-------------------------------------FUNCTION OF THIS FILE-------------------------------------*/
/* This file sets up the routing and handling of actions for a weather app. It uses the HTML5 History API to manage the app's navigation. This code sets up the routing mechanism for the weather app, allowing the user to navigate between the current location and searched locations based on the URL hash. The updateWeather function is called to fetch weather data for the selected locations, and the error404 function is called when an invalid route is encountered.
*/





"use strict";
/*
This directive is a statement that enables strict mode for the entire script or a specific function. When "use strict"; is used at the beginning of a script or a function, it enables a stricter set of rules and better error handling in the code, helping developers write more robust and secure JavaScript.
*/






import { updateWeather, error404 } from "./app.js";
// This imports two functions, updateWeather and error404, from the ./app.js file. These functions are part of the weather app's core functionality.






/*---------------------------------DEFAULT LOCATION-------------------------------------*/
const defaultLocation = "#/weather?lat=24.833271&lon=92.778908";
// This sets a default location using latitude and longitude values in the form of a URL hash (defaultLocation). This location is used when geolocation is not available or when there is an error retrieving the user's current location.







/*---------------------------------CURRENT LOCATION-------------------------------------*/
const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;
      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    },
    (err) => {
      window.location.hash = defaultLocation;
    }
  );
};
/*
This function is responsible for obtaining the user's current location using the Geolocation API. It calls window.navigator.geolocation.getCurrentPosition to get the latitude and longitude coordinates of the user's location. If successful, it calls the updateWeather function with the latitude and longitude as parameters to fetch weather data for the user's current location. If there's an error or the user denies permission to access geolocation, it redirects to the default location.
*/






/*---------------------------------SEARCHED LOACTION WEATHER FORECAST ROUTING-------------------------------------*/
/**
 *
 * @param {string} query Searched query
 */
const searchedLocation = (query) => updateWeather(...query.split("&"));
// updateWeather("lat=24.833271", "lon=92.778908")
/*
This function takes a query as input, which is expected to be a string containing latitude and longitude values in the form of a URL query string (e.g., "lat=24.833271&lon=92.778908").
It then splits the query string into an array of two elements (latitude and longitude) using the split("&") method.
The updateWeather function is called with the latitude and longitude as separate arguments to fetch weather data for the searched location.
*/







/*---------------------------------MAPPING LINKS TO FUNCTIONS-------------------------------------*/
const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);
/*
The routes variable is a Map object that maps route paths to corresponding functions. It contains two entries:
"/current-location" maps to the currentLocation function.
"/weather" maps to the searchedLocation function.
*/







/*---------------------------------EXTRACTING ROUTE AMD QUERY AND LINKING TO RESPECTIVE FUNCTIONS-------------------------------------*/
const checkHash = function () {
  const requestURL = window.location.hash.slice(1);

  const [route, query] = requestURL.includes
    ? requestURL.split("?")
    : [requestURL];

  routes.get(route) ? routes.get(route)(query) : error404();
};
/*
The checkHash function is responsible for checking the current URL hash, extracting the route and query (if present), and then calling the corresponding function from the routes map.
*/








/*---------------------------------NAVIGATION WHEN URL IS CHANGED-------------------------------------*/
window.addEventListener("hashchange", checkHash);
/*
When the hashchange event is triggered (e.g., when the URL hash changes due to navigation), it calls the checkHash function to handle the navigation. 
*/







/*---------------------------------NAVIGATING DURING INITIAL STATE-------------------------------------*/
window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
/*
On page load, the load event listener is used to determine the initial state of the app. If there is no hash (no route specified), it sets the default location as the hash (#/current-location). If there is a hash, it calls the checkHash function to handle the initial navigation.
*/
