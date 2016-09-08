var application = require("application");
require('nativescript-hidden');
require('nativescript-dynamicloader');
var le = require('nativescript-liveedit');
le.restartFile('cards.js');
le.restartFile('main-page.js');
application.start({ moduleName: "main-page" });
