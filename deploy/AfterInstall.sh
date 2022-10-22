#!/bin/bash

# 배포 주소
BASE_PATH="/home/ubuntu/deploy-test"

sudo apt-get update

# docker 설치
sudo apt install -y docker.io

cd ${BASE_PATH}

sudo docker pull qwp1216/blog-client

sudo docker rm -f web-client
# sudo docker build -f Dockerfile.prod -t web-client .
sudo docker run -d \
  -p 80:80 \
  -p 443:443 \
  --name web-client \
  qwp1216/blog-client

sudo docker images --quiet --filter=dangling=true | sudo xargs --no-run-if-empty docker rmi