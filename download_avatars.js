const request = require('request');
const fs = require('fs');
const dotev = require('dotenv/config');
const GITHUB_USER = "zzidante";
const GITHUB_TOKEN = process.env.GIT_API_KEY;
const repoOwner = process.argv[2];
const repoName = process.argv[3];

function getRepoContributors(requestURL, cb) {
  if (!repoOwner || !repoName) {
    console.log("You need to specify a Username and Repo name. Try again.");
    return;
  }
  
  console.log("Welcome to the GitHub Avatar Downloader!\n Type in the name of the Contributor and the Repo name.");

  let userObject = {};

  request(requestURL, (_err, _res, body) => {
    const data = JSON.parse(body);

    if(!fs.existsSync("./avatars/")) {
      fs.mkdirSync("./avatars/");
    }

    data.forEach((entry) => {
      userObject.username = entry.login;
      userObject.avatar = entry.avatar_url;
      cb(userObject);
    });
  });
}

function downloadImageByUrl(userObject) {
  request.get(userObject.avatar)
    .on('error', (err) => {
      throw err;
    })
    .on('end', (_end) => {
      console.log("Download Finished");
    })
    .pipe(fs.createWriteStream(`./avatars/${userObject.username}.jpg`));
}

let requestURL = {
  url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos${repoOwner}/${repoName}/contributor`,
  headers: { 'User-Agent': 'zzidante' },
};

// initiate the process
getRepoContributors(requestURL, downloadImageByUrl);