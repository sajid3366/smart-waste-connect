FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN apk add  --no-cache  curl

COPY . .

RUN npm run build
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "start" ]