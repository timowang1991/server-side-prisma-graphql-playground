FROM node:12.14.0-alpine

ARG PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

RUN npm run build

RUN npm run test

RUN npm prune --production

CMD [ "npm", "start"]
