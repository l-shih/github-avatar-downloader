const request = require('request');
const secret = require('./secret.js');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

const repoOwner = process.argv[2];
const repoName = process.argv[3];
const checkerOwner = process.argv.slice(2);
const checkerName = process.argv.slice(3);

function getRepoContributors(repoOwner, repoName, cb) {
  if (checkerOwner.length === 0 || checkerName.length === 0) {
    console.log("You forgot either the username or the repo name. Try again.");
  } else {
    const options = {
      url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
      headers: {
        'User-Agent': 'request',
        'Authorization': "token " + secret.GITHUB_TOKEN
      }
    };
    request(options, function(err, res, body) {
      const obj = JSON.parse(body);
      cb(obj);
    });
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, (obj) => {
  obj.forEach((function(obj) {
    downloadImageByURL(obj["avatar_url"], `avatars/${obj["login"]}.jpg`);
  }));
  console.log('Avatars have been downloaded. Check the avatars folder!');
});


