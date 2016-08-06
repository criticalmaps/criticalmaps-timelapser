var phantom = require('phantom');
var zpad = require('zpad');

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
            width: 1280,
            height: 720
        })
        return sitepage.open('http://criticalmaps.net/map#12/52.5226/13.4203');
    })
    .then(status => {
        console.log(status);
        var imageCounter = 0;
        setInterval(function() {
            sitepage.render(zpad(imageCounter)+'.png');
             imageCounter++;
        }, 2000);
        // sitepage.close();
        // phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
