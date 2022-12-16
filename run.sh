#!/bin/bash
docker run -itd -p 3000:3000 \
  --name="nodejs_log_example_svr" \
  nodejs_log_example/svr:latest
