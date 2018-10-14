# find-folder

> 得到某个目录下的所有文件

## language [简体中文](https://github.com/AfterThreeYears/find-folder/blob/master/README-zh_CN.md.md) [English](https://github.com/AfterThreeYears/find-folder/blob/master/README.md)

## 🚀 Usage

### 1. 安装

```shell
  npm install --save find-folder
```

### 2. 使用:

假如有如下文件夹
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
// 返回如下内容
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```

### 3. 选项:

**path:**
初始化路径, 例子
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root' });
  console.log(data);
})();
// 返回如下内容
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```
**type:**
搜索方式，有两种方式`DFS`深度优先和 `BFS`广度优先，默认**广度优先**
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', type: 'DFS' });
  console.log(data);
})();
// 返回如下内容
// [ { path: '/tmp/root', type: 'dir' },
//   { path: '/tmp/root/a', type: 'dir' },
//   { path: '/tmp/root/a/index.js', type: 'file' },
//   { path: '/tmp/root/b', type: 'dir' },
//   { path: '/tmp/root/b/index.js', type: 'file' } ]
```
**ignore:**
忽略的文件夹
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', ignore: ['/tmp/root/b'] });
  console.log(data);
})();
// 返回如下内容
//[ { path: '/tmp/root', type: 'dir' },
//  { path: '/tmp/root/a', type: 'dir' },
//  { path: '/tmp/root/a/index.js', type: 'file' },
```

**depth:**
往下寻找的深度
```javascript
const find = require('find-folder');
(async () => {
  const data = await find({ path: '/tmp/root', ignore: ['/tmp/root/b'] });
  console.log(data);
})();
// 返回如下内容
// [ { path: '/tmp/root', type: 'dir' },
// { path: '/tmp/root/a', type: 'dir' },
// { path: '/tmp/root/b', type: 'dir' } ]
```

### 4. 单元测试:


```shell
  npm run test
```

```sh
> find-folder@0.0.2 test find-folder
> sh ./test/dir.sh && jest

 PASS  test/index.test.js
  ✓ defualt (12ms)
  ✓ BFS (2ms)
  ✓ DFS (3ms)
  ✓ ignore (2ms)
  ✓ deep (1ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.292s
Ran all test suites.
```

