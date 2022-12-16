FROM node:16.18.0

LABEL maintainer="isaacgan"
LABEL descrition="nodejs_log_example"

WORKDIR /data/svr

COPY . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js"]
