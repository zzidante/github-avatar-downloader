var request = require('request');
var codeInput = process.argv.slice(2);
var GITHUB_USER = "zzidante";
var GITHUB_TOKEN = "cf00c4d270f935c36bbdfc63af249cab3b1fc983";
var repoOwner = "jquery";
var repoName = "jquery";
var requestURL = {
  url: 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'zzidante'
  }
};

console.log('Welcome to the Github Avatar Downloader!');



function getRepoContributors(requestURL, cb) {
  var userObject = {};
  request(requestURL, function(err, response, body) {
    var data = JSON.parse(body);
    data.forEach(function(entry) {
      userObject.username = entry.login;
      userObject.avatar = entry.avatar_url;
      // console.log(userObject);
      cb(userObject);
    });
  });
} //bracket ends for function getRepo


function downloadImageByURL(url, filePath) {

}



getRepoContributors(requestURL, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
}); //bracket ends here for getRepoContributora





// Your next and final step in this exercise should be to change
// your getRepoContributors function to parse the JSON string into an
// object and pass this object (an array of contributor objects)
// to the cb function.







  // request.get(requestURL)
  //   .on('error', function (err) {
  //     console.log("That is not a valid command.");
  //     throw err;
  //   })
  //   .on('response', function (response) {
  //     console.log(`Response Status Code:  ${response.statusCode}: ${response.statusMessage} - ${response.headers['content-type']}`)
  //   })







// var request = require('request');
// var code = process.argv.slice(2)[0];
// var front_url = 'http://coincap.io/front';
// var coin_url = 'http://coincap.io/page/';

// if (code) {
//   var url = coin_url + lookup.toUpperCase();
//   request(url, function(err, res, body) {
//     var coin = JSON.parse(body);

//     if (coin.id) {
//       console.log(`${coin.display_name} (${coin.id})`);
//       console.log("24hr change: ", coin.cap24hrChange);
//       console.log("USD: $" + coin.price_usd);
//     } else {
//       console.log("No coin data found for " + code);
//     }
//   });
// } else {
//   request(url, function(err, res, body) {
//     var coins = JSON.parse(body);

//     for (var i = 0; i < coins.length; i++) {
//       var coin = coins[i];
//       console.log(`${coin.long} (${coin.short}) - $${coin.price}`);
//     }
//   });
// }