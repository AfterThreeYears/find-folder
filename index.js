const fs = require('fs');
const { promisifyAll } = require('bluebird');
const path = require('path');
const _ = require('lodash');

promisifyAll(fs);

module.exports = async function foo(p) {
  if (_.isString(p)) p = [{ path: p.trim(), type: 'dir' }];
  if (_.isEmpty(p)) return [];
  // 获取该目录下所有的文件
  const dirs = [];
  for (let index = 0; index < p.length; index++) {
    let element = p[index];
    if (_.isObject(element) && element.type === 'file') break;
    debugger;
    if (_.isObject(element)) element = element.path;
    try {
      const d = await generta(path.resolve(element));
      debugger;
      dirs.push(...d); 
    } catch (error) {
      console.log('读取类型错误', error);
      process.exit(1);
    }
  }
  debugger;
  return p.concat(...(await foo(dirs)));
}

async function generta(p) {
  let dirs = [];
  try {
    dirs = await fs.readdirAsync(p);
    dirs = dirs.map(dir => path.resolve(p, dir));
    for (let index = 0; index < dirs.length; index++) {
      const element = dirs[index];
      const stat = await fs.statAsync(element);
      dirs[index] = { path: element, type: stat.isDirectory() ? 'dir' : 'file' };
    }
  } catch (error) {
    console.log('读取子目录失败', error);
    process.exit(1);
  }
  return dirs;
}

