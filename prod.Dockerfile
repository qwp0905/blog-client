FROM node:18.12.1 AS build

WORKDIR /origin

COPY ./package.json /origin
COPY ./package-lock.json /origin

RUN npm ci

COPY . /origin

RUN npm run build


FROM nginx:alpine

WORKDIR /app

COPY --from=build /origin/build /app

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]