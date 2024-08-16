# Stage 1: Build the NestJS application
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm i

COPY . .

RUN npm run build

RUN npm prune --production


# Stage 2: Create the development image
FROM node:18-alpine as development

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

RUN npm i --omit=dev

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]