FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
RUN apk add --no-cache curl

COPY . .

EXPOSE 5002
CMD ["node", "src/server.js"]
