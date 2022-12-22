const path = require("path");
const dayjs = require("dayjs");
const fs = require("fs-extra");
const winston = require("winston");

require('winston-daily-rotate-file');

const { combine, printf, splat } = winston.format;
const LOG_FILENAME = 'nodejs_log_example';
const DEV_LOG_DIR = path.resolve(__dirname, '../../logs');
const PROD_LOG_DIR = path.resolve('/tmp/logs');

const getDevTransports = () => {
  return [
    // 输出到 stdout（控制台）
    new winston.transports.Console(),
    // 将日志写入文件
    new winston.transports.File({ filename: path.join(DEV_LOG_DIR, `${LOG_FILENAME}.log`) })
  ];
};

const getProdTransports = () => {
  const filename = path.join(PROD_LOG_DIR, `${LOG_FILENAME}-%DATE%.log`);

  return [
    new winston.transports.DailyRotateFile({
      filename,
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '100m',
      maxFiles: '7d'
    })
  ];
};

const getTransports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return getDevTransports();
    case 'production':
    default:
      return getProdTransports();
  }
};

const logger = winston.createLogger({
  format: combine(
    splat(),
    printf(({ level, message }) => {
      return `${dayjs().format()} [${level}]: ${message}`;
    })
  ),
  transports: getTransports()
});

const safeloggerFactory = (logger) => {
  const logFactory = (level) => (...rest) => {
    try {
      let params = rest;
      if (rest.length === 1 && Object.prototype.toString.call(rest[0]) === "[object Function]") {
        params = rest[0]();
        console.info(params);
      }
      logger[level](...params); 
    } catch (error) {
      // log err
      logger.warn("[logger error] [level:%s] errMsg:%s", level, error.message);
    }
  };
  return {
    error: logFactory("error"),
    info: logFactory("info"),
    warn: logFactory("warn")
  };
};

const safelog = safeloggerFactory(logger);

safelog.error(() => ['Hello again distributed logs, %j', (() => {
  if (1) throw new Error("test")
  return { age: 12 }
})()])
safelog.info(() => ['Hello again distributed logs']);
safelog.warn(() => ['Hello again distributed logs']);

module.exports = safelog;
