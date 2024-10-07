# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy application source code
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
