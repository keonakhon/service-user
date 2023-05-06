FROM node:12.16.3-alpine3.9

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

ARG APP_PORT=3000

ENV PORT=${APP_PORT}

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${APP_PORT}
CMD [ "npm", "run", "dev" ]
