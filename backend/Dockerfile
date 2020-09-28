FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN yarn install

# Production image
FROM node:12.13

WORKDIR /home/node/app

EXPOSE 3000

CMD [ "node", "server.js" ]
