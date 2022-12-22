#!/bin/bash
docker run --rm -it \
  -p 3000:3000 \
  -v `pwd`:/workspace \
  -w /workspace \
  node:16.18.0 \
  /bin/bash
