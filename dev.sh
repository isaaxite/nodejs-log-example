#!/bin/bash
docker run --rm -it \
  -p 3000:3000 \
  -v `pwd`:/data/svr \
  -w /data/svr \
  -e NODE_ENV="development" \
  nodejs_log_example/svr:latest \
  /bin/bash
