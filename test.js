const findFolder = require('./index');

(async () => {
  try {
    const dirs = await findFolder('/tmp/a');
    console.log(dirs);
  } catch (error) {
    console.log('读取异常', error);
  }
})();
