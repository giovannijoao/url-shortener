FROM node:12-alpine

WORKDIR /node

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

WORKDIR /node/app

COPY . .

RUN npm run-script build

CMD [ "node", "build/index.js"]