# Use Node.js base image
FROM node:22

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the app code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Run your app
CMD ["npm", "start"]
