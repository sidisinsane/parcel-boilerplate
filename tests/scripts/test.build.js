/**
 * app.js
 * @desc app
 * @fileOverview Main Javascript File.
 * @mixin main/app
 */

/**
 * Sets JS build-state data-attribute
 *
 * Sets JS build-state data-attribute from "failing" to "passing"
 * when build/transpile method translates ES6 to readable code
 * in Browser currently running.
 *
 * Self Invoking Function
 */
(() => {
  var buildStateSelector = document.querySelector('#build-state-js [data-build-state]');
  buildStateSelector.setAttribute('data-build-state', 'passing');
})();
