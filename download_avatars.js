var request = require('request');
// var fs = require('fs');
var GITHUB_USER = "zzidante";
var GITHUB_TOKEN = "cf00c4d270f935c36bbdfc63af249cab3b1fc983";
var repoOwner = "jquery";
var repoName = "jquery";
var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';


console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get(requestURL)
    .on('error', function (err) {
      console.log("That is not a valid command.");
      throw err;
    })
    .on('response', function (response) {
      console.log(`Response Status Code:  ${response.statusCode}: ${response.statusMessage} - ${response.headers['content-type']}`)
    })
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

console.log(requestURL);




// Reference Code

// var request = require('request');
// var fs = require('fs');

// request.get('https://sytantris.github.io/http-examples/future.jpg')  // equiv to request()
//   .on('error', function (err) { // handles any error
//     console.log("That is not a vaid command");
//     throw err;
//   })
//   .on('data', function (data) { // when data is passed through stream
//     console.log("Downloading image...");
//   })
//   .on('end', function (end) { // end of stream
//     console.log("Download complete.");
//   })
//   .on('response', function (response) {  // handles response
//     console.log(`Response Status Code:  ${response.statusCode}: ${response.statusMessage} - ${response.headers['content-type']}`);
//   })
//   .pipe(fs.createWriteStream('./future.jpg'));


//   getRepoContributors("jquery", "jquery");