var phantom = require('phantom');

var sitepage = null;
var phInstance = null;

console.log("status");


phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        page.property('viewportSize', {
            width: 1280,
            height: 720
        })
        return sitepage.open('http://criticalmaps.net/map#12/52.5226/13.4203');
    })
    .then(status => {
        console.log(status);
        setTimeout(function() {
            sitepage.render('screenshot.png');
            sitepage.close();
            phInstance.exit();
        }, 1000);
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
