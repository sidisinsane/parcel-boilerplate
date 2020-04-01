/**
 * app.js
 * @desc app
 * @fileOverview Main Javascript File.
 * @mixin main/app
 */
import { debounce, throttle, verticalProgress } from './modules/helpers.js';


/**
 * Self Invoking Function
 */
(() => {
  console.log('data-build-state:', 'passing');
})();

/**
 * Page Progress
 */
window.addEventListener('scroll', throttle( (e) => {
  document.getElementById('progress-page').value = verticalProgress();
}, 10), false);
