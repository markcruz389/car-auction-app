FROM node:lts-alpine as base
WORKDIR /server
COPY package*.json  .
COPY . .
ARG ENV
RUN if [ "$ENV" = "production" ]; \
        then npm install; \
        fi
RUN if [ "$ENV" = "production" ]; \
        then npm run build; \
        fi
EXPOSE $PORT

# Dev
FROM base as dev
RUN npm install
CMD ["npm", "run", "dev"]

# Prod
FROM node:lts-alpine as prod
WORKDIR /server
COPY --from=base ./server/dist ./dist
COPY package*.json .
RUN npm install --omit=dev
CMD [ "npm", "start" ]




