"use strict";

/** Simple stupid function to remap main-page back onto this page **/

var mp = require('./main-page.js');
for (var key in mp) {
    if (mp.hasOwnProperty(key)) {
        exports[key] = mp[key];
    }
}