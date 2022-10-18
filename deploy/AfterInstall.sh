#!/bin/bash

# 배포 주소
BASE_PATH="/home/ubuntu/deploy-test"

sudo apt-get update

# docker 설치
sudo apt install -y docker.io

cd ${BASE_PATH}

docker rm -f web-client
docker build -t web-client .
docker run -d -p 80:80 -p 443:443 --name web-client