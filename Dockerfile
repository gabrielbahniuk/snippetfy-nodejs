FROM node:14-alpine

USER node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node

WORKDIR /home/node/app

COPY ./package*.json ./

COPY . ./

EXPOSE 3334

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
