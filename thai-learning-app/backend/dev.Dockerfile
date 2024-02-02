FROM node:16

WORKDIR /usr/src/server

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=server:*

USER node
CMD ["npm", "run", "dev"]