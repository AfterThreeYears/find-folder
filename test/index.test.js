const findFolder = require('../src/index.js');
const path = require('path');
const { types } = require('../src/constant');

const {
  FILE,
  DIRECTORY,
  SYMBOLICLINK,
  FIFO,
  SOCKET,
} = types;

const BFS = [ { path: '/tmp/find-folder', type: DIRECTORY },
{ path: '/tmp/find-folder/.git', type: DIRECTORY },
{ path: '/tmp/find-folder/1.txt', type: FILE },
{ path: '/tmp/find-folder/a1', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1', type: DIRECTORY },
{ path: '/tmp/find-folder/.git/11111', type: FILE },
{ path: '/tmp/find-folder/a1/a1.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2/a3', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: FILE } ];

const DFS = [ { path: '/tmp/find-folder', type: DIRECTORY },
{ path: '/tmp/find-folder/.git', type: DIRECTORY },
{ path: '/tmp/find-folder/.git/11111', type: FILE },
{ path: '/tmp/find-folder/1.txt', type: FILE },
{ path: '/tmp/find-folder/a1', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a1.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2/a3', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: FILE },
{ path: '/tmp/find-folder/deep1', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: DIRECTORY } ];

const ignore = [ { path: '/tmp/find-folder', type: DIRECTORY },
{ path: '/tmp/find-folder/1.txt', type: FILE },
{ path: '/tmp/find-folder/a1', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a1.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: FILE },
{ path: '/tmp/find-folder/a1/a2/a3', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: FILE },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: DIRECTORY },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: FILE } ];

const depth = [ { path: '/tmp/find-folder', type: DIRECTORY },
{ path: '/tmp/find-folder/.git', type: DIRECTORY },
{ path: '/tmp/find-folder/1.txt', type: FILE },
{ path: '/tmp/find-folder/a1', type: DIRECTORY },
{ path: '/tmp/find-folder/deep1', type: DIRECTORY } ];

const typeMap = [
  {"path": `${__dirname}/resource`, "type": DIRECTORY},
  {"path": `${__dirname}/resource/file`, "type": FILE},
  // {"path": `${__dirname}/resource/pipename`, "type": FIFO},
  // {"path": `${__dirname}/resource/socket`, "type": SOCKET},
  {"path": `${__dirname}/resource/soft-file`, "type": SYMBOLICLINK},
];

test('defualt', async () => {
  expect.assertions(1);
  const data = await findFolder('/tmp/find-folder');
  expect(data).toEqual(BFS);
});

test('BFS', async () => {
  expect.assertions(1);
  const data = await findFolder({ path: '/tmp/find-folder' });
  expect(data).toEqual(BFS);
});

test('DFS', async () => {
  expect.assertions(1);
  const data = await findFolder({ path: '/tmp/find-folder', type: 'DFS' })
  expect(data).toEqual(DFS);
});

test('ignore', async () => {
  expect.assertions(1);
  const data = await findFolder({ path: '/tmp/find-folder', ignore: ['/tmp/find-folder/.git'] });
  expect(data).toEqual(ignore);
});

test('deep', async () => {
  expect.assertions(1);
  const data = await findFolder({ path: '/tmp/find-folder', depth: 1 });
  expect(data).toEqual(depth);
});

test('test type', async () => {
  expect.assertions(1);
  const data = await findFolder({ path: path.join(__dirname, './resource') });
  expect(data).toEqual(typeMap);
});
