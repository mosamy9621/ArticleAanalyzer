# Article Analayzer
## Description
###### This project is a simple application that analyze articles and provide the user with information about them.
###### It uses meaning cloud's Sentiment Analysis API to process the article found in the URL and view some statistics about it .
## Dependencies 
It uses number of open sources packages to work as desired :
- [webpack](https://webpack.js.org/) bundler v 4.35.3 
-  [webpack-cli](https://webpack.js.org/) CLI v 3.3.5
- [axios](https://github.com/axios/axios) HTTP client  v 0.21.1 
- [body-parser](https://www.npmjs.com/package/body-parser) middleware v 1.19.0 
- [cors](https://expressjs.com/en/resources/middleware/cors.html) middleware v 2.8.5 
- [express](https://expressjs.com/) framework v 4.17.1
## Installation
Article Analyzer require [Node.js](https://nodejs.org/en/) v14.16.0 + package manager to be installed 
(to be able to install dependencies).
```sh
npm install --save
```

##### An important step to be done create .env file and add your API_KEY.
```sh
API_KEY = your_api_key_provided_by_meaning_cloud
````
for development environments...  (webpack-build-server runs on port 8080) 
```sh
npm run build-dev
```
 for production enviroments... (express server runs on port 8081 )
```sh
npm start
```
```sh
http://localhost:8080 /* development */
http://localhost:8081 /* production */
``` 
## API Credits 
##### All API credits gose to [Meaning Cloud](https://www.meaningcloud.com/) Sentiment Analysis service.