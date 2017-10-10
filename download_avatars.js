var request = require('request');
var fs = require('fs');
var codeInput = process.argv.slice(2)[0];
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

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(requestURL, cb) {
  var userObject = {}
  request(requestURL, function(err, res, body) {
    var data = JSON.parse(body);
    if(!fs.existsSync("./avatars/")) {
      fs.mkdirSync("./avatars/")
    }
    data.forEach(function(entry){
      userObject.username = entry.login;
      userObject.avatar = entry.avatar_url;
      cb(userObject)
    })
  })
}

function downloadImageByUrl(userObject) {
  request.get(userObject.avatar)
  .on('error', function (err){
    throw err;
  })
  .on('end', function (end){
    console.log("Download Finished")
  })
  .pipe(fs.createWriteStream('./avatars/' + userObject.username + '.jpg'))
}

getRepoContributors(requestURL, downloadImageByUrl)