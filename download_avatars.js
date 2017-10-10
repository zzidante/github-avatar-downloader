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
  request(requestURL, function(err, response, body) {
    var data = JSON.parse(body);
    data.forEach(function(entry) {
      console.log(`${entry.login}: ${entry.avatar_url}`);
    });
  });
} //bracket ends for function getRepo



getRepoContributors(requestURL, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
}); //bracket ends here for getRepoContributora


