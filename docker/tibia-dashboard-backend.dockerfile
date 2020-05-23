FROM node:latest
LABEL key="Max Gomes"

WORKDIR /var/www
COPY src ./src
COPY package.json package-lock.json ./
COPY .env.production .env
RUN npm ci
ENTRYPOINT node src/index.js

EXPOSE 3000