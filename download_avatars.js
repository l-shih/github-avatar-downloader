var request = require('request');

var secret = require('./secret.js');

var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         //console.log('Response Status Code: ', response.statusCode);
         //console.log('downloading...');
         //console.log('downloaded');
       })
       .pipe(fs.createWriteStream(filePath))
}

getRepoContributors(repoOwner, repoName, (obj) => {
  obj.forEach((function(obj) {
    downloadImageByURL(obj["avatar_url"], "avatars/"+obj["login"]+".jpg");
  }));
  console.log('Avatars have been downloaded.');
});


