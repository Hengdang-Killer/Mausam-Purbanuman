/*-------------------------------------FUNCTION OF THIS FILE-------------------------------------*/
/*
This file contains utility functions to fetch weather data from the OpenWeather API by constructing the appropriate URLs and handling the data retrieval process using the Fetch API. The api_key variable ensures that the requests are authenticated and authorized to access the weather data.
*/



"use strict";




/*-------------------------------------THE API KEY-------------------------------------*/
const api_key = "6f92f72e0a8a35a48b162c191e99e48d";
/*
This variable holds the API key used to make requests to the OpenWeather API. The API key is required to authenticate the requests and access weather data.
*/




/*-------------------------------------FETCHING DATA FROM THE URL-------------------------------------*/
/*
This function is responsible for fetching data from the server using the Fetch API. 

It takes two parameters :-
URL: The API URL to fetch data from.
callback: A callback function that will be called with the fetched data.

The fetch function is used to make an HTTP GET request to the specified URL, and the API key is appended to the request URL as a query parameter (appid). Once the data is retrieved from the server, it is converted to JSON using the res.json() method. Finally, the callback function is called with the fetched data as its argument.
*/
/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback callback
 */
export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then((res) => res.json())
    .then((data) => callback(data));
};




/*-------------------------------------RETURNING REQUIRED URLs FOR DIFFERENT WEATHER DATA-------------------------------------*/
/*
The "url" object contains various functions that return specific API URLs for different types of weather data.

url.currentWeather(lat, lon): Returns the URL for fetching current weather data for the specified latitude and longitude.

url.forecast(lat, lon): Returns the URL for fetching weather forecast data for the specified latitude and longitude.

url.airPollution(lat, lon): Returns the URL for fetching air pollution data for the specified latitude and longitude.

url.reverseGeo(lat, lon): Returns the URL for reverse geocoding to find location information based on latitude and longitude.

url.geo(query): Returns the URL for geocoding to find location information based on a search query (e.g., city name).
*/

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },

  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },

  airPollution(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },

  reverseGeo(lat, lon) {
    return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },

  /**
   * @param {string} query Search query e.g.: "Silchar", "Gauhati"
   */
  geo(query) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};
