FROM nginx:1.17-alpine

ENV AUTHOR valerio.farrotti@gmail.com
ENV UPDATED 20210603

ARG ENV

RUN apk add yarn

RUN rm /etc/nginx/conf.d/default.conf

ADD etc/default.${ENV}.conf /etc/nginx/conf.d/default.conf

ADD static/ /usr/src/app/static/

WORKDIR /usr/src/app/static/

RUN yarn install

WORKDIR /usr/src/app/
