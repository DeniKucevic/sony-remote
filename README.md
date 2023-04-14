[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<a href="https://www.buymeacoffee.com/denikucevic"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height="20px"></a>

# Sony remote control

Sony remote control is a Capacitor app that can be used to control SONY - BRAVIA TVs on local network.
App is made utilizing API documentation found here: https://pro-bravia.sony.net/develop/

## Description

App can be used on Android and IOS, there is no support for web control since I couldn't figure out a good way to find a TV on the local network from web browser. The only way would be to enter the IP address manualy and I think that would be too technical for most users. I might add support for that after I figure out a better way to connect to the TV from the Capacitor app. Capacitor was paired with React and Ionic UI. This is a passion project of mine since when I needed some app to control the TV I could not found single one that was not riddled with ADs and that really annoyed me. Since this is a passion project I can only guarantee that there will be no ADs in the app 😎, Code is free and open source, if you want to contribute feel free to open a PR and I will update app stores and contributors on this page. Suggestions, ideas and advices are welcome 😊.

## Getting Started

### Dependencies

* node v16.13.1
* npm v8.1.2

### Installing

* Clone the project
* Install dependencies with 
```
npm install
```

### Executing program

* Depending on what platform, you can run it in browser (no TV discovery) with
```
npm run start
``` 
*  or if you want to run it on device I recommend using Ionic extension for VS code or consult Ionic docs here: https://ionicframework.com/docs/developing/starting .
* Android studio (recommended for Android)
* Xcode (recommended for IOS)

## Help



## Authors

Contributors names and contact info

[@DeniKucevic](https://github.com/DeniKucevic)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [pro-bravia.sony](https://pro-bravia.sony.net/develop/)
* [digaus/community-capacitor-wifi ](https://github.com/digaus/community-capacitor-wifi)