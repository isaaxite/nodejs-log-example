const Koa = require('koa');
const safelog = require('./src/utils/log');
const app = new Koa();

app.use(async ctx => {
  safelog.info(() => [
    "123, %j", aaaa
  ]);
  safelog.info(
    "123, %j", { age: 123444 });
  ctx.body = 'Hello World';
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('listen 3000');
});
