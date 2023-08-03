/*-------------------------------------FUNCTION OF THIS FILE-------------------------------------*/
/*
This file is the main file for the weather app and handles the search functionality, fetching weather data from the API, and rendering the weather information on the page based on the user's input or the user's current location. 
*/



"use strict";



/*-------------------------------------------IMPORTING FILES-------------------------------------------*/

import { fetchData, url } from "./api.js";
/*
The fetchData function is used to fetch data from the server.
url is an object containing various URL templates for different API endpoints.
*/

import * as module from "./module.js";
/*
The module.js file contains utility functions and constants related to date and time formatting, converting units, and text descriptions for Air Quality Index (AQI) levels.
*/





/*-------------------------------------------ADDING EVENT-LISTENER TO ELEMENTS-------------------------------------------*/
/*
This is a utility function that allows us to add the same event listener to multiple elements at once. This function loops through each element in the elements NodeList and adds the specified event listener (with the provided eventType and callback) to each element.

elements: This is a NodeList, which is a collection of DOM elements, which represents the elements to which we want to add the event listener.

eventType: This is a string that specifies the type of event you want to listen for, such as "click", "mouseover", "keydown", etc.

callback: This is a function that will be called whenever the specified event occurs on any of the elements.
*/

const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};






/*-------------------------------------------ASSIGNING VARIABLES AND EVENTS TO THE DOM ELEMENTS-------------------------------------------*/
/**
 * Toggle search in mobile devices
 * This code sets up a mechanism to toggle the visibility of the search view (controlled by the "active" class) when any of the elements with the [data-search-toggler] attribute is clicked.
 */


const searchView = document.querySelector("[data-search-view]");

const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");

addEventOnElements(searchTogglers, "click", toggleSearch);






/*-------------------------------------------VARIABLES FOR THE SEARCH FUNCTIONALITY------------------------------------------*/
/**
 * By using these following variables and element selections, the application can track user input in the search field, manage API calls based on the input, and display the search results in the specified search result container.
*/


const searchField = document.querySelector("[data-search-field]");
// It represents the input field where the user can enter their search query.


const searchResult = document.querySelector("[data-search-result]");
// It represents the container where the search results will be displayed.


let searchTimeout = null;
// This variable will be used to store the timeout ID returned by the setTimeout function when scheduling a search API call after a certain delay. It helps to manage the timing of API requests based on user input.


const searchTimeoutDuration = 500;
// This variable represents the time duration (in milliseconds) that the application will wait after the user stops typing before making the search API call. This delay helps to prevent excessive API requests while the user is still typing their query.






/*----------------------------------------------------THE SEARCH FUNCTIONALITY----------------------------------------------------*/
/*
The following code adds an event listener to the searchField input element. The listener is triggered whenever the user types or changes the input in the search field. 
The search results are displayed as a list of locations (e.g., cities) matching the user's search query. 
When the user clicks on a search result, the toggleSearch function is called to close the search view (searchView.classList.remove("active")), and the searchResult element is cleared (searchResult.classList.remove("active")) to hide the search results. 
The addEventOnElements function is used to add click event listeners to each search result item to handle these actions. 
*/




searchField.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchField.value) // If the search field is empty, it means the user has cleared the input 
  {
    searchResult.classList.remove("active"); // Removes the "active" class from the searchResult element, hiding the search results container.
    
    searchResult.innerHTML = ""; // Clears the content inside the searchResult element, removing any previously displayed search results.
    
    searchField.classList.remove("searching"); //Removes the "searching" class from the searchField element, which may have been added earlier if the user was                                                       typing a query.
  } 
  else 
  {
    searchField.classList.add("searching"); // adding the CSS class "searching" to the searchField element to provide visual feedback to the user that their                                                     search query is being processed.
  }



  
/*
This following code is an event listener attached to the input event of the searchField element. When the user types in the search field, this event listener triggers a search request after a short delay (to avoid rapid API calls). Once the location data is fetched, the search results are displayed in a container, and clicking on any search result item will close the search results container and populate the search field with the selected location.
*/
  
  if (searchField.value) {

    searchTimeout = setTimeout(() => {


      fetchData(url.geo(searchField.value), function (locations) {


        searchField.classList.remove("searching");
        //  Removes the CSS class "searching" from the searchField element indicating that the search is no longer in progress.


        searchResult.classList.add("active");
        // Adds the CSS class "active" to the searchResult element, which displays the search results container and makes it visible to the user.



        searchResult.innerHTML = `
                <ul class="view-list" data-search-list></ul>
                `;
        // This will be used to display the search results.


        const /** {NodeList} | [] */ items = [];


        for (const { name, lat, lon, country, state } of locations) {
          

          const searchItem = document.createElement("li");
          // This creates a new list item element (<li>) in the DOM, which will represent a single search result in the list of search results.



          searchItem.classList.add("view-item");
          // It adds the CSS class "view-item" which contains styling rules to format and style the appearance of the search result item.


          searchItem.innerHTML = `
                    <span class="m-icon">location_on</span>

                    <div>
                        <p class="item-title">${name}</p>
                        <p class="label-2 item-subtitle">${
                          state || ""
                        } ${country}</p>
                    </div>
                    <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
                    `;
          // This is the content of the search result item.



          searchResult
            .querySelector("[data-search-list]")
            .appendChild(searchItem);
          // Appends the newly created search result item to the <ul> element inside the searchResult container.



          items.push(searchItem.querySelector("[data-search-toggler]"));
          // Adds the search item's toggle element (a link with class "item-link") to the items array. This array is used to attach event listeners to the toggle elements later.
        
        
        }
        addEventOnElements(items, "click", function () {
          toggleSearch();
          searchResult.classList.remove("active");
        });
        // Once all search items are appended to the search results container, this line calls the addEventOnElements function to attach a click event listener to each toggle element ([data-search-toggler]). The event listener function closes the search results container when the user clicks on a search result item.


        
      });
    }, searchTimeoutDuration);
  }
});





const container = document.querySelector("[data-container]");
// This line selects the element with the attribute data-container in the HTML document and assigns it to the variable container. The document.querySelector() method allows us to select elements using CSS-like selectors.

const loading = document.querySelector("[data-loading]");
// This line selects the element with the attribute data-loading in the HTML document and assigns it to the variable loading.

const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
// This line selects the element with the attribute data-current-location-btn in the HTML document and assigns it to the variable currentLocationBtn.

const errorContent = document.querySelector("[data-error-content]");
// This line selects the element with the attribute data-error-content in the HTML document and assigns it to the variable errorContent.





/*-----------------------------------------------WEATHER FORECAST----------------------------------------------------------*/
/*
This function seems to be responsible for updating the weather-related content on the web page based on the provided latitude and longitude.
*/
/**
 * Render all weather data in html page
 *
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = function (lat, lon) {




  /*-----------------MAKING READY WEATHER STYLING-----------------*/
/*
This part is only responsible for preparing the elements on the web page and adjusting their styles and attributes.
*/
  loading.style.display = "grid";
  container.style.overflowY = "hidden";
  container.classList.remove("fade-in");
  
  errorContent.style.display = "none";
  // To hide error if previously error was shown.

  const currentWeatherSection = document.querySelector(
    "[data-current-weather]"
  );
  const highlightSection = document.querySelector("[data-highlights]");
  const hourlySection = document.querySelector("[data-hourly-forecast]");
  const forecastSection = document.querySelector("[data-5-day-forecast]");

  currentWeatherSection.innerHTML = "";
  highlightSection.innerHTML = "";
  hourlySection.innerHTML = "";
  forecastSection.innerHTML = "";
  // These four lines clear the contents of the respective sections to ensure that the sections are empty before updating them with new weather data.


  
  if (window.location.hash === "#/current-location") {
    currentLocationBtn.setAttribute("disabled", "");
  } else {
    currentLocationBtn.removeAttribute("disabled");
  }
  // The above code checks if the window's location hash contains "#/current-location". If it does, it sets the "disabled" attribute on the currentLocationBtn element, which is a button used for obtaining weather data for the user's current location. If the location hash does not contain "#/current-location", it removes the "disabled" attribute, allowing the button to be clickable.





  /*-----------------MAIN FORECASTING BEGINS-----------------*/

  /**
   * CURRENT WEATHER SECTION
  */
  fetchData(url.currentWeather(lat, lon), function (currentWeather) {

    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = currentWeather;
    const [{ description, icon }] = weather;
    // The function receives the currentWeather object containing various weather-related data from the API response. It destructures the required properties from currentWeather such as weather, dt, sys, main, visibility, and timezone.




    const card = document.createElement("div");
    card.classList.add("card", "card-lg", "current-weather-card");
    // It creates an HTML element to display the current weather information. The relevant data from the currentWeather object is used to fill in the content of this element.




    card.innerHTML = `
        <h2 class="title-2 card-title">Now</h2>
        <div class="weappper">
            <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>
            <img src="./assets/images/weather_icons/${icon}.png" alt="${description}" width="64"
                height="64" class="weather-icon">
        </div>
        <p class="body-3">${description}</p>

        <ul class="meta-list">
            <li class="meta-item">
                <span class="m-icon">calendar_today</span>
                <p class="title-3 meta-text">${module.getData(
                  dateUnix,
                  timezone
                )}</p>
            </li>
            <li class="meta-item">
                <span class="m-icon">location_on</span>
                <p class="title-3 meta-text" data-location></p>
            </li>
        </ul>
        `;

    fetchData(url.reverseGeo(lat, lon), function ([{ name, country }]) {
      card.querySelector("[data-location]").innerHTML = `${name}, ${country}`;
    });

    currentWeatherSection.appendChild(card);
    // The card element displaying the current weather information is appended to the currentWeatherSection element, to display it on the web page.


    /**
     * TODAY'S HIGHLIGHTS
     */

    fetchData(url.airPollution(lat, lon), function (airPollution) {
      const [
        {
          main: { aqi },
          components: { no2, o3, so2, pm2_5 },
        },
      ] = airPollution.list;

      const card = document.createElement("div");
      card.classList.add("card", "card-lg");

      card.innerHTML = `
            <h2 class="title-2" id="highlists-label">Today's Highlights</h2>

            <div class="highlight-list">

                <div class="card card-sm highlight-card  one">
                    <h3 class="title-3">Air Quality Index</h3>
                    <div class="wrapper">
                        <span class="m-icon">air</span>

                        <ul class="card-list">
                            <li class="card-item">
                                <p class="title-1">${pm2_5.toPrecision(3)}</p>
                                <p class="label-1">PM <sub>2.5</sub></p>
                            </li>
                            <li class="card-item">
                                <p class="title-1">${so2.toPrecision(3)}</p>
                                <p class="label-1">SO <sub>2</sub></p>
                            </li>
                            <li class="card-item">
                                <p class="title-1">${no2.toPrecision(3)}</p>
                                <p class="label-1">NO <sub>2</sub></p>
                            </li>
                            <li class="card-item">
                                <p class="title-1">${o3.toPrecision(3)}</p>
                                <p class="label-1">O<sub>3</sub></p>
                            </li>
                        </ul>

                    </div>

                    <span class="badge aqi-${aqi} label-${aqi}" title="${
        module.aqiText[aqi].message
      }">${module.aqiText[aqi].level}</span>
                </div>

                <div class="card card-sm highlight-card two">

                    <h3 class="title-3">Sunrise & Sunset</h3>

                    <div class="card-list">

                        <div class="card-item">
                        <span class="m-icon">clear_day</span>
                        <div>
                            <p class="label-1">Sunrise</p>
                            <p class="title-1">${module.getTime(
                              sunriseUnixUTC,
                              timezone
                            )}</p>
                        </div>
                        </div>


                        <div class="card-item">
                            <span class="m-icon">clear_night</span>
                            <div>
                                <p class="label-1">Sunset</p>
                                <p class="title-1">${module.getTime(
                                  sunsetUnixUTC,
                                  timezone
                                )}</p>
                            </div>
                            </div>

                    </div>
                </div>

                <div class="card card-sm highlight-card">

                    <h3 class="title-3">Humidity</h3>

                    <div class="wrapper">
                        <span class="m-icon">humidity_percentage</span>
                        <p class="title-1">${humidity}<sub>%</sub></p>
                    </div>

                </div>

                <div class="card card-sm highlight-card">

                    <h3 class="title-3">Pressure</h3>

                    <div class="wrapper">
                        <span class="m-icon">airwave</span>
                        <p class="title-1">${pressure}<sub>hPa</sub></p>
                    </div>

                </div>

                <div class="card card-sm highlight-card">

                    <h3 class="title-3">Visibility</h3>

                    <div class="wrapper">
                        <span class="m-icon">visibility</span>
                        <p class="title-1">${visibility / 1000}<sub>km</sub></p>
                    </div>

                </div>

                <div class="card card-sm highlight-card">

                    <h3 class="title-3">Feels Like</h3>

                    <div class="wrapper">
                        <span class="m-icon">thermostat</span>
                        <p class="title-1">${parseInt(
                          feels_like
                        )}&deg;<sup>c</sup></p>
                    </div>

                </div>
            </div>
            `;
      highlightSection.appendChild(card);
    });




    /**
     * 24H FORECAST SECTION
     */
    fetchData(url.forecast(lat, lon), function (forecast) {
      const {
        list: forecastList,
        city: { timezone },
      } = forecast;

      hourlySection.innerHTML = `
            <h2 class="title-2">Today at</h2>
                    <div class="slider-container">
                        <ul class="slider-list" data-temp></ul>
                        <ul class="slider-list" data-wind></ul>
                    </div>
            `;
      for (const [index, data] of forecastList.entries()) {
        if (index > 7) break;
        const {
          dt: dateTimeUnix,
          main: { temp },
          weather,
          wind: { deg: windDirection, speed: windSpeed },
        } = data;
        const [{ icon, description }] = weather;

        const tempLi = document.createElement("li");
        tempLi.classList.add("slider-item");

        tempLi.innerHTML = `
                <div class="card card-sm slider-card">
                <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>
                <img src="./assets/images/weather_icons/${icon}.png" width="48" height="48" loading="lazy" alt="${description}" class="weather_icon" title="${description}">
                <p class="body-3">${parseInt(temp)}&deg;<sup>c</sup></p>
                </div>
                `;
        hourlySection.querySelector("[data-temp]").appendChild(tempLi);

        const windLi = document.createElement("li");
        windLi.classList.add("slider-item");
        windLi.innerHTML = `
        <div class="card card-sm slider-card">
        <p class="body-3">${module.getHours(dateTimeUnix, timezone)}</p>
        <img src="./assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" class="weather-icon" alt="direction" style="transform:rotate(${
          windDirection - 180
        }deg)">
        <p class="body-3">${parseInt(module.mps_to_kmh(windSpeed))}km/h</p>
        </div>
        `;
        hourlySection.querySelector("[data-wind]").appendChild(windLi);
      }




      
      /**
       * 5 DAY FORECAST SECTION
       */
      forecastSection.innerHTML = `
          <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
          <div class="card card-lg forecast-card">
              <ul data-forecast-list></ul>
          </div>
      `;

      for (let i = 7, len = forecastList.length; i < len; i += 8) {
        const {
          main: { temp_max },
          weather,
          dt_txt,
        } = forecastList[i];
        const [{ icon, description }] = weather;
        const date = new Date(dt_txt);

        const li = document.createElement("li");
        li.classList.add("card-item");

        li.innerHTML = `
            <div class="icon-wrapper">
              <img src="./assets/images/weather_icons/${icon}.png" alt="Overcast Clouds" width="36"
              height="36" class="weather-icon" alt="${description}" title="${description}">
              <span class="span">
                <p class="title-2">${parseInt(temp_max)}&deg;<sup>c</sup></p>
              </span>
            </div>
            <p class="label-1">${date.getDate()} ${
          module.monthNames[date.getUTCMonth()]
        }</p>
            <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
        `;
        forecastSection.querySelector("[data-forecast-list]").appendChild(li);
      }
      loading.style.display = "none";
      container.style.overflowY = "overlay";
      container.classList.add("fade-in");
    });
  });
};

export const error404 = () => (errorContent.style.display = "flex");
