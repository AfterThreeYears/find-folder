const fs = require('fs');
const path = require('path');

const sep = path.sep;

function getStat(datas) {
  const promises = datas.map((d) => {
    return new Promise((resolve, rejcet) => {
      fs.stat(d, (err, stat) => {
        if (err) return rejcet(err);
        resolve({ path: d, type: stat.isDirectory() ? 'dir' : 'file' });
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
      const files = await getStat(datas);
      resolve(files);
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
    if (file.type === 'dir') {
      const subPaths = await getSubPaths(file.path);
      const config = {
        depth,
        base,
        ignore,
        subPaths: subPaths.reverse(),
      };
      stack.push(...getEffectivePath(config)); // 入栈
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
    if (file.type === 'dir') {
      const subPaths = await getSubPaths(file.path);
      const config = {
        depth,
        base,
        ignore,
        subPaths,
      };
      queue.push(...getEffectivePath(config)); // 入队
    }
  }
  return result;
}

module.exports = async function findFolder(config) {
  let option = {
    ignore: [],
    base: '',
    depth: 9999,
    type: 'BFS',
  };
  if (typeof config === 'string') {
    option.base = config;
    option.path = [{ path: config, type: 'dir' }];
  } else {
    option = { ...option, ...config };
    option.base = config.path;
    option.path = [{ path: config.path, type: 'dir' }];
  }
  return option.type === 'BFS' ?
    await BFS({ queue: option.path, ...option }) :
    await DFS({ stack: option.path, ...option });
};
