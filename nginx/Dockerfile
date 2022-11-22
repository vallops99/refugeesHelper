FROM nginx:1.17-alpine

ENV AUTHOR valerio.farrotti@gmail.com
ENV UPDATED 20210603

ARG ENV

RUN apk add yarn

WORKDIR /usr/src/app/

RUN rm /etc/nginx/conf.d/default.conf
ADD etc/default.${ENV}.conf /etc/nginx/conf.d/default.conf

COPY ./package.json /usr/src/app/package.json
COPY ./yarn.lock /usr/src/app/yarn.lock

RUN yarn install
