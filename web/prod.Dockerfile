from node:18.14 as base

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run start
