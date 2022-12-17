FROM node:lts-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

# Copying file into APP directory of docker
COPY ./package.json ./yarn.lock /home/node/app/

RUN npm install -g @nestjs/cli

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /home/node/app/

CMD ["npm", "run", "start:dev"]

EXPOSE 5555

ENV NODE_ENV=production
RUN npm run build
CMD node dist/main.js
