const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('listen 3000');
});
