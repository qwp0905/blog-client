#!/bin/bash

HOST=host.docker.internal

if [ -z "$(sudo docker ps | grep proxy)" ]; then
  sudo docker rm -f proxy
  sudo docker run -d \
                  --name proxy \
                  --pull=always \
                  --add-host ${HOST}:host-gateway \
                  --restart=unless-stopped \
                  -v /home/ubuntu/log:/var/log/nginx/ \
                  -p 80:80 \
                  -p 443:443 \
                  qwp1216/blog-client-proxy
fi

if [ -z "$(sudo docker ps | grep blue)" ]; then
  CURRENT="blue"
  PREVIOUS="green"
  PORT="8080"
else
  CURRENT="green"
  PREVIOUS="blue"
  PORT="8081"
fi

sudo docker rm -f web-client-${PREVIOUS}

sudo docker run -d \
                --name web-client-${CURRENT} \
                -p ${PORT}:80 \
                --pull=always \
                --restart=unless-stopped \

sleep 10

EXISTS_CURRENT=$(docker exec proxy curl -I ${HOST}:${PORT})
REQUEST=$(echo "$EXISTS_CURRENT" | grep HTTP)

if [ -z "$REQUEST" ]; then
  sudo docker rm -f web-client-${CURRENT}
  exit 1
else
  sudo docker stop web-client-${BEFORE}
  sudo docker rm web-client-${BEFORE}
fi

sudo docker images --quiet --filter=dangling=true | sudo xargs --no-run-if-empty docker rmi
