#!/bin/bash

cp ${KEY} .
cp ${CERT} .
cp ${ENV} .

docker build --platform linux/amd64 \
            -t qwp1216/blog-client \
            -f Dockerfile.prod .

docker build --platform linux/amd64 \
            -t qwp1216/blog-client-proxy \
            -f Dockerfile.proxy .

docker login -u qwp1216 -p ${DOCKER_PWD}
docker push qwp1216/blog-client
docker push qwp1216/blog-client-proxy

docker images --quiet --filter=dangling=true | xargs --no-run-if-empty docker rmi
