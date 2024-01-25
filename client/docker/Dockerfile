FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG WORKDIR_PATH="docker/.env"
ENV WORKDIR_PATH=$WORKDIR_PATH

RUN nuxt build --dotenv WORKDIR_PATH

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.output ./

CMD ["node", "server/index.mjs"]
