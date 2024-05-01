# For copyright and license terms, see COPYRIGHT.md (top level of repository)
# Repository: https://github.com/georga-app/georga-client-react

FROM node:bookworm

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /code
COPY package*.json ./
RUN npm install --no-audit
RUN chown -R node:users node_modules
CMD npm run start
