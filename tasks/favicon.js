const { execSync } = require('child_process');
const { createHash } = require('crypto');
const invertColor = require('invert-color');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param str
 * @returns {*}
 */
const toNumeronym = (str) => {
  const lastIndex = str.length - 1;

  return str[0] + str.substring(1, lastIndex).length + str[lastIndex];
};

/**
 *
 * @param str
 * @param limit
 * @returns {void | string | *}
 */
const disemvowel = (str, limit=3) => {
  let chars = str.replace(/[aeiou]/gi, '');

  if (limit && chars.length > limit) {
    chars = chars[0] + chars.slice(-(limit - 1));
  }

  return chars;
};

/**
 *
 * @param disemvoweled
 * @param limit
 * @returns {any}
 */
const getShortname = (disemvoweled=true, limit=3) => {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString();
  const n = branchName.indexOf('/');
  const branchType = branchName.substring(0, n != -1 ? n : branchName.length - 1);

  return disemvoweled ? disemvowel(branchType, limit) : toNumeronym(branchType);
};

/**
 *
 * @param str
 * @param inverted
 * @returns {*}
 */
const getColorFromStr = (str, inverted=false) => {
  const hash = createHash('sha256');
  hash.update(str);
  const color = '#' + hash.digest().toString('hex').substring(0, 6);

  return inverted ? invertColor(color, true) : color;
};

/**
 *
 * @returns {string}
 */
const createFavicon = () => {
  const shortName = getShortname();
  const color = getColorFromStr(shortName);
  const invertedColor = invertColor(color, true);

  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" width="64px" height="64px">
        <circle cx="32" cy="32" fill="${color}" r="32"></circle>
        <text fill="${invertedColor}" x="32" y="32" font-family="'Fira Mono', monospace" font-size="24" text-anchor="middle" alignment-baseline="central">${shortName}</text>
    </svg>`;
};

/**
 *
 * @param svg
 */
const writeFavicon = () => {
  const favicon = createFavicon();

  let writeStream = fs.createWriteStream(path.join(process.cwd(), 'favicon.svg'));
  writeStream.write(favicon);
  writeStream.on('finish', () => {
    console.log('wrote all data to file');
  });
  writeStream.end();
};

writeFavicon();
