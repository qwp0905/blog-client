#!/bin/bash

HOST="host.docker.internal"
NGINX_CONF="/etc/nginx/nginx.conf"
DOCKER_REGISTRY="qwp1216/blog-client"

if [ -z "$(sudo docker ps | grep proxy)" ]; then
  echo "Create nginx proxy..."
  sudo docker ps -aqf name=proxy | sudo docker rm -f
  sudo docker run -d \
                  --name proxy \
                  --pull=always \
                  --add-host ${HOST}:host-gateway \
                  --restart=unless-stopped \
                  -v /home/ubuntu/log:/var/log/nginx/ \
                  -p 80:80 \
                  -p 443:443 \
                  ${DOCKER_REGISTRY}-proxy:latest
fi

if [ -z "$(sudo docker ps | grep blue)" ]; then
  CURRENT="blue"
  PREVIOUS="green"
  PORT="8080"
  PREV_PORT="8081"
else
  CURRENT="green"
  PREVIOUS="blue"
  PORT="8081"
  PREV_PORT="8080"
fi

echo "Create server $CURRENT..."
sudo docker ps -aqf name=web-client-${CURRENT} | sudo xargs --no-run-if-empty docker rm -f
sudo docker run -d \
                --name web-client-${CURRENT} \
                -p ${PORT}:80 \
                --pull=always \
                --restart=unless-stopped \
                ${DOCKER_REGISTRY}:latest

sleep 10

for COUNT in {1..10}
do
  echo "$COUNT trying..."
  if [ -n "$(curl -sI localhost:${PORT} | grep HTTP)" ]; then
    echo "$CURRUNT succeed"
    sudo docker exec proxy \
      sed -i "s/${HOST}:${PORT} down/${HOST}:${PORT}/" ${NGINX_CONF}
    sudo docker exec proxy \
      sed -i "s/${HOST}:${PREV_PORT}/${HOST}:${PREV_PORT} down/" ${NGINX_CONF}
    sudo docker exec proxy \
      nginx -s reload

    sudo docker stop -t 10 web-client-${PREVIOUS}
    sudo docker rm web-client-${PREVIOUS}

    sudo docker images -qf dangling=true | sudo xargs --no-run-if-empty docker rmi -f
    exit 0
  else
    sleep 3
  fi
done

sudo docker rm -f web-client-${CURRENT}
sudo docker images -qf dangling=true | sudo xargs --no-run-if-empty docker rmi -f
echo "Fail to start server..."
exit 1
