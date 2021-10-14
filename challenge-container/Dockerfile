FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["challenge-website/package.json", "challenge-website/package-lock.json*", "./"]

RUN npm install --production

COPY ./challenge-website .

CMD [ "node", "index.js" ]