# Use Node.js as build stage
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --project Customer_Angular --configuration production  # Corrected build command

# Use Nginx for serving Angular app
FROM nginx:alpine
COPY --from=build-stage /app/dist/customer-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
