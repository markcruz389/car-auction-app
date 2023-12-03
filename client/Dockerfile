# Step 1: Build the application
FROM node:lts-alpine AS builder
WORKDIR /client
COPY package.json package-lock.json ./
RUN npm install
# RUN npm ci

COPY . .
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /client/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]