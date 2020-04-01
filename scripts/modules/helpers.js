/**
 * Debounce function
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
const debounce = (callback, delay = 250) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay)
  }
};

/**
 * Throttle function
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
const throttle = (callback, delay) => {
  let inThrottle;

  return (...args) => {
    const context = this;
    if (!inThrottle) {
      callback.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  }
};

/**
 * Returns vertical page progress in percent
 *
 * @returns {number}
 */
const verticalProgress = () => {
  const elem = document.documentElement;
  const body = document.body;

  return Math.ceil((elem.scrollTop || body.scrollTop) / ((elem.scrollHeight || body.scrollHeight) - elem.clientHeight) * 100 );
};

export { debounce, throttle, verticalProgress };
