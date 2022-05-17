FROM node:16 as hardin

RUN apt-get update && apt-get install -y graphicsmagick

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]

FROM hardin as production

ENV NODE_PATH=./build

RUN npm run build
