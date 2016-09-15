var application = require("application");
require('nativescript-dom');

var mainPage = "main-dynamic";
try {
    require('nativescript-dynamicloader');
    global.hasDynamic = true;
    console.log("Dynamic Loader Mode...");
} catch (err) {
    mainPage = "main-page";
    global.hasDynamic = false;
    console.log("Slow Mode (No DynamicLoader)...");
}
var le = require('nativescript-liveedit');
le.restartFile('cards.js');
le.restartFile('main-page.js');
le.restartFile('main-dynamic.js');
application.start({ moduleName: mainPage });
