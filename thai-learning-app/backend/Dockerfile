FROM node:16

WORKDIR /usr/src/server

COPY --chown=node:node . .
RUN npm ci --only=production

ENV DEBUG=server:*

USER node
CMD ["npm", "start"]