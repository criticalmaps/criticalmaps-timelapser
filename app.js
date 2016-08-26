var phantom = require('phantom');
var zpad = require('zpad');
var fs = require('fs');
var zlib = require('zlib');
var fileExists = require('file-exists');
var AWS = require('aws-sdk');

var FOLDER = "images/" + new Date().toISOString() + "/";

AWS.config.update({
  accessKeyId: 'AKIAJJFK3VJ3HUIYLQGQ',
  secretAccessKey: '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',
  region: 'eu-central-1'
});
var s3Bucket = new AWS.S3({
  params: {
    Bucket: 'criticalmaps-timelapse'
  }
})

var uploadFileToS3 = function(filename) {
  var ivl = setInterval(function() {
    if (fileExists(filename)) {
      clearInterval(ivl);
      var body = fs.createReadStream(filename).pipe(zlib.createGzip());
      fs.readFile(filename, function(err, file_buffer) {
        var params = {
          Key: 'screenshots/' + filename,
          Body: file_buffer
        };
        s3Bucket.upload(params, function(err, data) {
          console.log(filename);
          // fs.unlink(filename);
        });
      })
    }
  }, 1000);
}

zpad.amount(12);

var sitepage = null;
var phInstance = null;

phantom.create()
  .then(instance => {
    phInstance = instance;
    return instance.createPage();
  })
  .then(page => {
    sitepage = page;
    page.property('viewportSize', {
      width: 2560,
      height: 1440
    })
    return sitepage.open('http://criticalmaps.net/map#13/52.5208/13.3763');
  })
  .then(status => {
    console.log(status);
    sitepage.evaluateJavaScript("function(){ $(body).trigger({type: 'keypress', which: 104, keyCode: 104}); $('#header').remove(); $('#map-share').remove(); }");
    var imageCounter = 0;
    setInterval(function() {
      var imageName = FOLDER + zpad(imageCounter) + '.png';
      sitepage.render(imageName)
      // uploadFileToS3(imageName);
      imageCounter++;
    }, 2000);
    // sitepage.close();
    // phInstance.exit();
  })
  .catch(error => {
    console.log(error);
    phInstance.exit();
  });
