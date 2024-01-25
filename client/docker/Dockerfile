FROM node:18-alpine as builder

WORKDIR /builder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /builder/.output/ ./

CMD ["node", "server/index.mjs"]
