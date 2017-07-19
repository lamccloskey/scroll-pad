require('./polyfill-array-from');
require('./google-analytics');
require('./firebase.config');
require('./user.manager');
require('./notes.repo');
require('../sass/styles.scss');
var img = require('../images/scrollpad.gif');

document.addEventListener('touchstart', function() {}, true);
document.querySelector('#splash-img').setAttribute('src', img);
document.querySelector('#splash-img').setAttribute('height', '250px');