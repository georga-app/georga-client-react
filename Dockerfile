FROM node:bookworm

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /code
COPY package*.json ./
RUN npm install
RUN chown -R node:users node_modules
CMD npm run start
