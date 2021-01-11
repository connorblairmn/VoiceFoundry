import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { API } from 'aws-amplify';
import { WeatherRoot } from './weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VoiceFoundry-app';
  //variables related to getting the weather from the VoiceFoundryGetWeatherAPI
  apiName = 'VoiceFoundryGetWeatherApi';
  path = '/items';
  //holds the response from the API
  get_weather_api_resp: WeatherRoot | null = null;
  //flag if an error occurred
  api_error_occ: boolean = false;

  ngOnInit() {
    //get the weather
    API.get(this.apiName, this.path, null)
      .then((response) => {
        //convert the JSON to the weather interface and set local variable.
        this.get_weather_api_resp = response as WeatherRoot;
      })
      .catch((error) => {
        //Note an error occurred and show the error view.
        console.log(`An error occurred getting the weather: ${error.response}`);
        this.api_error_occ = true;
      });
  }
}
