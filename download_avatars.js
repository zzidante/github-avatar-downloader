const request = require('request');
const fs = require('fs');
const dotev = require('dotenv/config')
const GITHUB_USER = "zzidante";
const GITHUB_TOKEN = process.env.GIT_API_KEY;
const repoOwner = process.argv[2];
const repoName = process.argv[3];

if (!repoOwner || !repoName) {
  console.log("You need to specify a Username and Repo name. Try again.");
    return;
}

let requestURL = {
  url: 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'zzidante'
  }
};

console.log('Welcome to the GitHub Avatar Downloader!');
// console.log('Make sure you type in the name of the Contributor and then the Repo name.')

function getRepoContributors(requestURL, cb) {
  let userObject = {}
  request(requestURL, function(err, res, body) {
    const data = JSON.parse(body);
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

getRepoContributors(requestURL, downloadImageByUrl)  // initiate the process