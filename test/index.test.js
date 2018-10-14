const findFolder = require('../index.js');

const BFS = [ { path: '/tmp/find-folder', type: 'dir' },
{ path: '/tmp/find-folder/.git', type: 'dir' },
{ path: '/tmp/find-folder/1.txt', type: 'file' },
{ path: '/tmp/find-folder/a1', type: 'dir' },
{ path: '/tmp/find-folder/deep1', type: 'dir' },
{ path: '/tmp/find-folder/.git/11111', type: 'file' },
{ path: '/tmp/find-folder/a1/a1.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2/a3', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: 'file' } ];

const DFS = [ { path: '/tmp/find-folder', type: 'dir' },
{ path: '/tmp/find-folder/.git', type: 'dir' },
{ path: '/tmp/find-folder/.git/11111', type: 'file' },
{ path: '/tmp/find-folder/1.txt', type: 'file' },
{ path: '/tmp/find-folder/a1', type: 'dir' },
{ path: '/tmp/find-folder/a1/a1.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2/a3', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: 'file' },
{ path: '/tmp/find-folder/deep1', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: 'dir' } ];

const ignore = [ { path: '/tmp/find-folder', type: 'dir' },
{ path: '/tmp/find-folder/1.txt', type: 'file' },
{ path: '/tmp/find-folder/a1', type: 'dir' },
{ path: '/tmp/find-folder/deep1', type: 'dir' },
{ path: '/tmp/find-folder/a1/a1.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep1.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a2.md', type: 'file' },
{ path: '/tmp/find-folder/a1/a2/a3', type: 'dir' },
{ path: '/tmp/find-folder/deep1/deep2/deep2.txt', type: 'file' },
{ path: '/tmp/find-folder/deep1/deep2/deep3', type: 'dir' },
{ path: '/tmp/find-folder/a1/a2/a3/a3.md', type: 'file' } ];

const depth = [ { path: '/tmp/find-folder', type: 'dir' },
{ path: '/tmp/find-folder/.git', type: 'dir' },
{ path: '/tmp/find-folder/1.txt', type: 'file' },
{ path: '/tmp/find-folder/a1', type: 'dir' },
{ path: '/tmp/find-folder/deep1', type: 'dir' } ];

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
