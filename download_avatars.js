var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
var fs = require('fs');

var userAndRepo = process.argv.slice[2];

// the URL should be https://github.com/[USER]/[REPONAME]/graphs/contributors

// create new directory "AVATARS"
// each img should be named USERNAME.png