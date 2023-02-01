FROM node:19-alpine3.16
WORKDIR /app

COPY app.js .
COPY bin ./bin
COPY helperFunctions.js .
COPY models ./models
COPY package.json .
COPY package-lock.json .
COPY routes ./routes
COPY views ./views

RUN npm ci

EXPOSE 3000

CMD npm ci && ./node_modules/nodemon/bin/nodemon.js bin/www.js
