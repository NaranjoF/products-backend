FROM node:20.19.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.19.0-slim

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

COPY --from=build /app/package*.json /app/

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
