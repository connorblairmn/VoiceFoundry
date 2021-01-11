/**
 * Get the current weather in Tulsa Oklahoma.
 *
 * @author Connor Blair.
 * @since  01.10.21
 */

exports.handler = async (event) => {
  //get the open weather api key from AWS secret manager then get the weather in Tusla, OK
  return get_weather_api_key()
    .then((key) => {
      // Tusla, OK open weather city ID
      const tusla_ok_city_id = 4553433;
      //get weather in Tusla, OK
      return get_weather(tusla_ok_city_id, key).then((response) => {
        return response;
      });
    })
    .catch((error) => {
      console.log(`Error occurred getting the open weather key: ${error.code}`);
      //create error response
      var error_response = {
        statusCode: 500,
        //  enable CORS requests
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(error.code),
      };
      return error_response;
    });
};

/**
 * Returns JSON object of weather information in Tusla, OK
 *
 * @param {string} city_id The ID of the city for the Open Weather API
 * @param {string} key The key to access the Open Weather API
 * @returns {JSON} JSON object holding weather information in city ID or
 *                 JSON object holding error message
 */
function get_weather(city_id, key) {
  return new Promise(function (resolve, reject) {
    //create the HTTPS request to call the open weather api
    const axios = require("axios");
    const request_path =
      "https://api.openweathermap.org/data/2.5/weather?id=" +
      city_id +
      "&appid=" +
      key +
      "&units=imperial";
    //make the request to get the weather in Tulsa
    axios
      .get(request_path)
      .then((api_response) => {
        var response = {
          statusCode: 200,
          //  enable CORS requests
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
          body: JSON.stringify(api_response.data),
        };
        resolve(response);
      })
      .catch((error) => {
        console.log(`Error occurred getting weather: ${error}`);
        //create error response
        var error_response = {
          statusCode: 500,
          //  enable CORS requests
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
          body: JSON.stringify(error),
        };
        resolve(error_response);
      });
  });
}

/**
 * Gets the open weather api key from AWS secret manager
 *
 * @returns {string} Open weather api key
 * @throws DecryptionFailureException, InternalServiceErrorException, InvalidParameterException, InvalidRequestException, ResourceNotFoundException
 */
function get_weather_api_key() {
  return new Promise(function (resolve, reject) {
    // Load the AWS SDK
    var AWS = require("aws-sdk"),
      region = "us-east-1",
      secretName = "open_weather_key",
      secret,
      decodedBinarySecret;

    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
      region: region,
    });
    //Get the api key
    client.getSecretValue({ SecretId: secretName }, function (err, data) {
      if (err) {
        console.log(`Error occurred getting secret key: ${err.code}`);
        if (err.code === "DecryptionFailureException")
          // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
          reject(err);
        else if (err.code === "InternalServiceErrorException")
          // An error occurred on the server side.
          reject(err);
        else if (err.code === "InvalidParameterException")
          // You provided an invalid value for a parameter.
          reject(err);
        else if (err.code === "InvalidRequestException")
          // You provided a parameter value that is not valid for the current state of the resource.
          reject(err);
        else if (err.code === "ResourceNotFoundException")
          // We can't find the resource that you asked for.
          reject(err);
      } else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ("SecretString" in data) {
          secret = JSON.parse(data.SecretString);
          const open_weather_key = secret.open_weather_key;
          resolve(open_weather_key);
        } else {
          let buff = new Buffer(data.SecretBinary, "base64");
          decodedBinarySecret = buff.toString("ascii");
          console.log(`binary found: ${decodedBinarySecret}`);
          resolve(decodedBinarySecret);
        }
      }
    });
  });
}
