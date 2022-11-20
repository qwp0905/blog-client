#!/bin/bash

HOST=host.docker.internal
NGINX_CONF=/etc/nginx/nginx.conf

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
  PREV_PORT="8081"
else
  CURRENT="green"
  PREVIOUS="blue"
  PORT="8081"
  PREV_PORT="8080"
fi

sudo docker rm -f web-client-${CURRENT}

sudo docker exec proxy \
  sed -i "s/${HOST}:${PORT} down/${HOST}:${PORT}/" ${NGINX_CONF}


sudo docker run -d \
                --name web-client-${CURRENT} \
                -p ${PORT}:80 \
                --pull=always \
                --restart=unless-stopped \
                qwp1216/blog-client

sleep 10

if [ -z "$(curl -I localhost:${PORT} |& grep HTTP)" ]; then
  sudo docker rm -f web-client-${CURRENT}
  exit 1
else
  sudo docker exec proxy \
    sed -i "s/${HOST}:${PREV_PORT}/${HOST}:${PREV_PORT} down/" ${NGINX_CONF}
  sudo docker exec proxy \
    nginx -s reload

  sudo docker stop -t 10 web-client-${PREVIOUS}
  sudo docker rm web-client-${PREVIOUS}
fi

sudo docker images --quiet --filter=dangling=true | sudo xargs --no-run-if-empty docker rmi
