FROM node:lts-alpine as build-stage

WORKDIR /client
COPY package.json .
RUN npm install
COPY . .

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'