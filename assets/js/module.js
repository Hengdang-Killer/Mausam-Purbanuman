/*-------------------------------------FUNCTION OF THIS FILE-------------------------------------*/
/*
This file contains several utility functions and data related to weather and air quality. These utility functions and data are useful for formatting date and time strings and for converting speed units. The aqiText object provides descriptions of air quality levels based on the AQI scale, helping users understand the air quality conditions in a user-friendly way.
*/ 


"use strict";



/*------------------------------ARRAY OF WEEK AND MONTHS FOR MAPPING-------------------------------------*/
/*
These are arrays containing names of weekdays and months, respectively. These arrays are used to format date and time strings later in the code.
*/

export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];




/*---------------------------------------------GETTING THE CURRENT DATE-------------------------------------*/
/*
This function takes a Unix date in seconds and a timezone shift from UTC in seconds as input. It converts the Unix date to a human-readable date string in the format "Sunday 10, Jan" (e.g., "Sunday 10, Feb"). It uses the weekDayNames and monthNames arrays to get the names of the weekday and month corresponding to the provided date.
*/
/**
 *
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @returns {string} Date String. Format: "Sunday 10, Jan"
 */
export const getData = function (dateUnix, timezone) {

  const date = new Date((dateUnix + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];
  
  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;

};



/*---------------------------------------------GETTING THE CURRENT TIME-------------------------------------*/
/*
This function takes a Unix time in seconds and a timezone shift from UTC in seconds as input. It converts the Unix time to a human-readable time string in the format "HH:MM AM/PM" (e.g., "02:30 PM"). The function calculates the hours and minutes from the provided time and also determines whether it is "AM" or "PM" based on the hour.
*/
/**
 *
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @returns {string} Time String. Format: "HH:MM AM/PM"
 */
export const getTime = function (timeUnix, timezone) {

  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;

};




/*---------------------------------------------GETTING THE CURRENT HOUR-------------------------------------*/
/*
This function is similar to the getTime function but returns a time string without the minutes. The format is "HH AM/PM" (e.g., "02 PM").
*/
/**
 *
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @returns {string} Time String. Format: "HH AM/PM"
 */
export const getHours = function (timeUnix, timezone) {
  
  const date = new Date((timeUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${period}`;

};




/*---------------------------------------------CHANGING THE UNIT OF THE CURRENT WIND SPEED-------------------------------------*/
/*
This function converts meters per second (mps) to kilometers per hour (km/h). It takes a speed value in mps as input and returns the equivalent value in km/h.
*/
/**
 *
 * @param {number} mps Metter per seconds
 * @returns {number} Kilometer per hours
 */
export const mps_to_kmh = (mps) => {

  const mph = mps * 3600;
  return mph / 1000;

};




/*---------------------------------------------SUGGESTIONS REGARDING WEATHER CONDITIONS-------------------------------------*/
/*
This object "aqiText" that maps Air Quality Index (AQI) levels to corresponding text descriptions. It provides information about air quality levels and their associated messages. The AQI levels range from 1 to 5, and each level has a "level" and a "message" property.
*/
export const aqiText = {

  1: {
    level: "Good",
    message:
      "Air quality is considered satisfactory, and air pollution poses little or no risk",
  },
  2: {
    level: "Fair",
    message:
      "Air quality is acceptable; however, for some pollutants there may be a moderate health consern for a very small number of people who are unusally sensitive to air pollution",
  },
  3: {
    level: "Moderate",
    message:
      "Members of sensitive group may experience health effects. The general public is not likely to be affected",
  },
  4: {
    level: "Poor",
    message:
      "Everyone may begin to experience health effects; member of sensitive groups may experience more serious health effects",
  },
  5: {
    level: "Very Poor",
    message:
      "Health warnings to emergency conditions. The entire population is more likely to be affected",
  },

};
