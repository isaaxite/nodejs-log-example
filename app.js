const Koa = require('koa');
const safelog = require('./src/utils/log');
const app = new Koa();

app.use(async ctx => {
  safelog.info(() => ["123, %j", aaa]);
  safelog.info("123, %j", ctx);
  ctx.body = 'Hello World';
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('listen 3000');
});
