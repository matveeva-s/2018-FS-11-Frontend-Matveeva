const express = require('express');
const fileUpload = require('express-fileupload');
const http = require('http');
const app = express();
 // default options
app.use(fileUpload());
 app.get('/', function (req, res) {
    res.send('hello world');
})
 app.post('/message', function(req, res) {
  var result = Promise.resolve();
  if (typeof req.headers.origin === 'string') {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.files != null) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.attach;
    console.log(sampleFile.mimetype, sampleFile.md5());
	result = new Promise((resolve, reject) => {
      sampleFile.mv('/dev/null', function (err) {
        if (err) reject(err);
		else resolve();
	  });
    });
  }
  result
    .then(() => res.send('{"status":"ok"}'))
    .catch((err) => res.status(500).send(err));
 });
 app.listen('8081');
