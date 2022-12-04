FROM node:12

# Install MongoDB
RUN apt-get update
RUN apt-get install -y mongodb

# Create the database for the inventory management system
RUN mongo inventoryDB --eval "db.createCollection('items')"

# Copy the code for the inventory management system to the container
COPY . /app

# Install the dependencies for the inventory management system
WORKDIR /app
RUN npm install

# Expose the server port
EXPOSE 3000

# Start the server when the container is run
CMD ["node", "server.js"]
