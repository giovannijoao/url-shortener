FROM node:12-alpine

WORKDIR /node

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . .

RUN npm run-script build