# Use Node.js as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the required dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port for the Node.js server
EXPOSE 3000

# Run the server and client
CMD ["npm", "start"]
