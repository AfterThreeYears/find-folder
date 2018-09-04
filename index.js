const fs = require('fs');
const { promisifyAll } = require('bluebird');
const path = require('path');
const _ = require('lodash');

promisifyAll(fs);

async function collect(route) {
  let fileNames = [];
  let stats = [];
  try {
    fileNames = await fs.readdirAsync(route);
    const statsPromise = fileNames.map(filename => fs.statAsync(path.resolve(route, filename)));
    stats = await Promise.all(statsPromise);
  } catch (error) {
    console.error('[readdirAsync]: error is', error);
    process.exit(1);
  }
  fileNames = fileNames
    .map((filename, i) => {
      return { path: path.resolve(route, filename), type: stats[i].isDirectory() ? 'dir' : 'file' }
    });
  return fileNames;
}

async function findFolder(p) {
  if (_.isEmpty(p)) return [];
  // Get all the files in this directory
  let dirs = [];
  for (let i = 0; i < p.length; i += 1) {
    let route = p[i];
    if (_.isObject(route) && route.type === 'file') continue;
    if (_.isObject(route)) route = route.path;
    route = path.resolve(route);
    dirs.push(collect(route));
  }
  try {
    dirs = await Promise.all(dirs);
    dirs = _.flatten(dirs);
  } catch (error) {
    console.error('[collect]: error is', error);
    process.exit(1);
  }
  return p.concat(...(await findFolder(dirs)));
}

module.exports = function main(p) {
  try {
    if (_.isString(p)) p = [{ path: p.trim(), type: 'dir' }];
    return findFolder(p);
  } catch (error) {
    console.error('[find-folder]: error is', error);
    process.exit(1);
  }
};
