FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN npm install -g pm2

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]
