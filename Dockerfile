FROM node:16 as hardin

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

FROM hardin as production

ENV NODE_PATH=./build

RUN npm run build