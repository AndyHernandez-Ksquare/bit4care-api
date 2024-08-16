# Stage 1: Build the NestJS application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm i

COPY . .

RUN npm run build

RUN npm prune --production


# Stage 2: Create the development image
FROM node:18-alpine

WORKDIR /app

COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/package*.json ./
COPY --from=0 /app/prisma ./prisma

RUN npm i --omit=dev

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]