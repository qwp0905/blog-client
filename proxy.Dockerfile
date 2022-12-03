FROM nginx:alpine

WORKDIR /app

COPY ./nginx/nginx.proxy.conf /etc/nginx/nginx.conf
COPY ./private.key /etc/ssl/
COPY ./certification.crt /etc/ssl/

CMD ["nginx", "-g", "daemon off;"]