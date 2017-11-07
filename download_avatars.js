var request = require('request');

var secret = require('./secret.js');

console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secret.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    const obj = JSON.parse(body);
    //console.log(obj);
    cb(obj);
  });

}

getRepoContributors(repoOwner, repoName, (obj) => {
  obj.forEach((function(obj) {
    console.log(obj["avatar_url"]);
  }));
});


