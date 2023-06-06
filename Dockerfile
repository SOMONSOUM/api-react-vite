FROM node:16-alpine

RUN apk add --no-cache nano

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3333

CMD [ "yarn", 'start' ]