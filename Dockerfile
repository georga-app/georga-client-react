FROM node:bullseye

WORKDIR /code
COPY package*.json ./
RUN npm install
RUN chown -R node:users node_modules
CMD npm start
