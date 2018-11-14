# find-folder

> Get all files in a directory

## language [简体中文](https://github.com/AfterThreeYears/find-folder/blob/master/README-zh_CN.md) [English](https://github.com/AfterThreeYears/find-folder/blob/master/README.md)

## 🚀 Usage

### 1. installation

```shell
  npm install --save find-folder
```

### 2. Usage:

**If you have the following folders**
```sh
➜  root pwd
/tmp/root
➜  root tree
.
├── a
│   └── index.js
└── b
    └── index.js
```

```javascript
const find = require('find-folder');
(async () => {
  const data = await find('/tmp/root');
  console.log(data);
})();
// Return the following contents
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```

### 3. option:

**path:**
Initialization path, example
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root' });
  console.log(data);
})();
// Return the following contents
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```
**type:**
There are two ways to search: `DFS` depth first and `BFS` breadth first, default **breadth first**.
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', type: 'DFS' });
  console.log(data);
})();
// Return the following contents
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```
**ignore:**
Ignored folder
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', ignore: ['/tmp/root/b'] });
  console.log(data);
})();
// Return the following contents
//[ { path: '/tmp/root', type: 'dir' },
//  { path: '/tmp/root/a', type: 'dir' },
//  { path: '/tmp/root/a/index.js', type: 'file' },
```

**depth:**
Depth of search
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', ignore: ['/tmp/root/b'] });
  console.log(data);
})();
// Return the following contents
// [ { path: '/tmp/root', type: 'dir' },
// { path: '/tmp/root/a', type: 'dir' },
// { path: '/tmp/root/b', type: 'dir' } ]
```

**file type:**
```javascript
{
  FILE: 'FILE',
  DIRECTORY: 'DIRECTORY',
  SYMBOLICLINK: 'SYMBOLICLINK',
  FIFO: 'FIFO',
  SOCKET: 'SOCKET',
  BLOCKDEVICE: 'BLOCKDEVICE',
  CHARACTERDEVICE: 'CHARACTERDEVICE',
  UNKNOWN: 'UNKNOWN',
}
```

### 4. unit testing:


```shell
  npm run test
```

```sh
> find-folder@0.0.2 test find-folder
> sh ./test/dir.sh && jest

 PASS  test/index.test.js
  ✓ defualt (36ms)
  ✓ BFS (17ms)
  ✓ DFS (3ms)
  ✓ ignore (4ms)
  ✓ deep (2ms)
  ✓ test type (1ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.204s
Ran all test suites.
```

