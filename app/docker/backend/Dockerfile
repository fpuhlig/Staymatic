# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package files first
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

# Copy backend package files
COPY backend/package.json ./backend/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the application code
COPY backend/ ./backend/

# Build the TypeScript application
RUN yarn workspace @staymatic/backend build

# Expose the port Express.js runs on
EXPOSE 3001

# Run the Express.js application
CMD ["yarn", "workspace", "@staymatic/backend", "start"] 