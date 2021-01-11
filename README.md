# VoiceFoundry Interview

## About

This repository holds the source code for the VoiceFoundry interview coding assignment. The application can be found at https://dev.d10k14mdjfwc8o.amplifyapp.com.

## Built With

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Key Project Locations

    .
    ├── VoiceFoundry-App/amplify/backend/api/VoiceFoundryGetWeatherApi       # AWS API Gateway to get the weather in Tulsa, OK
    ├── VoiceFoundry-App/amplify/backend/function/VoiceFoundryGetWeatherFunc # AWS Lambda function to get the weather in Tulsa, OK
    ├── VoiceFoundry-App/amplify/backend/awscloudformation                   # Root CloudFormation Stack
    ├── VoiceFoundry-App/src/app                                             # Source files for Single Page Application (SPA)
    └── README.md

## Getting Started

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
