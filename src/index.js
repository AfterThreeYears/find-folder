const fs = require('fs');
const path = require('path');
const { types } = require('./constant');

const sep = path.sep;

function getType(stat) {
  switch(true) {
    case stat.isFile():
      return types.FILE;
    case stat.isDirectory():
      return types.DIRECTORY;
    case stat.isSymbolicLink():
      return types.SYMBOLICLINK;
    case stat.isFIFO():
      return types.FIFO;
    case stat.isSocket():
      return types.SOCKET;
    case stat.isBlockDevice():
      return types.BLOCKDEVICE;
    case stat.isCharacterDevice():
      return types.CHARACTERDEVICE;
    default:
      return types.UNKNOWN;
  }
}

function getStat(datas) {
  const promises = datas.map((d) => {
    return new Promise((resolve, rejcet) => {
      fs.lstat(d, (err, stat) => {
        if (err) return rejcet(err);
        resolve({ path: d, type: getType(stat) });
      });
    });
  });
  return Promise.all(promises);
}

function getSubPaths(subPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(subPath, async (err, data) => {
      if (err) return reject(err);
      const datas = data.map(d => path.resolve(subPath, d));
      try {
        const files = await getStat(datas);
        resolve(files);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * @param {*} depth 深度
 * @param {*} base 基本路径
 * @param {*} ignore 忽略列表
 */
function getEffectivePath({ subPaths, depth, base, ignore }) {
  return subPaths.filter((p) => {
    if (
      ignore.includes(p.path) ||
      p.path.replace(`${base}${sep}`, '').split(sep).length > depth
    ) return false;
    return true;
  });
}

/**
 * 深度优先
 */
async function DFS({ stack, depth, base, ignore }) {
  const result = [];
  while (stack.length) {
    const file = stack.pop(); // 出栈
    result.push(file);
    if (file.type === types.DIRECTORY) {
      try {
        const subPaths = await getSubPaths(file.path);
        const config = {
          depth,
          base,
          ignore,
          subPaths: subPaths.reverse(),
        };
        stack.push(...getEffectivePath(config)); // 入栈
      } catch (error) {
        console.error('DFS error', error);
      }
    }
  }
  return result;
}

/**
 * 广度优先
 */
async function BFS({ queue, depth, base, ignore }) {
  const result = [];
  while (queue.length) {
    const file = queue.shift(); // 出队
    result.push(file);
    if (file.type === types.DIRECTORY) {
      try {
        const subPaths = await getSubPaths(file.path);
        const config = {
          depth,
          base,
          ignore,
          subPaths,
        };
        queue.push(...getEffectivePath(config)); // 入队
      } catch (error) {
        console.error('BFS error', error);
      }
    }
  }
  return result;
}

module.exports = async function findFolder(config) {
  let option = {
    ignore: [],
    base: '',
    depth: Number.MAX_VALUE,
    type: 'BFS',
  };
  if (typeof config === 'string') {
    option.base = config;
    option.path = [{ path: config, type: types.DIRECTORY }];
  } else {
    option = { ...option, ...config };
    option.base = config.path;
    option.path = [{ path: config.path, type: types.DIRECTORY }];
  }
  return option.type === 'BFS' ?
    await BFS({ queue: option.path, ...option }) :
    await DFS({ stack: option.path, ...option });
};
