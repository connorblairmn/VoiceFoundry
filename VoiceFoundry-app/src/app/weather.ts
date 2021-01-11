/**
 * Inteface to represent the JSON weather data returned from the VoiceFoundryGetWeatherApi.
 *
 * @author Connor Blair.
 * @since  01.10.21
 */

// Root interface that points to the different sections of the weather data.
export interface WeatherRoot {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Holds the coordinates of the location
export interface Coord {
  lon: number;
  lat: number;
}

// Holds the generic weather information
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Holds the temperature, pressure, and humidity
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

// holds wind information
export interface Wind {
  speed: number;
  deg: number;
}

// holds clouds information
export interface Clouds {
  all: number;
}

// holds generic information about the location
export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
