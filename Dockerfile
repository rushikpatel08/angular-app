# Use Node.js for building the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project and build it
COPY . .
RUN npm run build --configuration production

# Use Nginx to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app to the Nginx HTML folder
COPY --from=build /app/dist/customer-angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
