# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and yarn.lock for dependency installation
COPY app/backend/package.json ./package.json
COPY app/yarn.lock ../yarn.lock
COPY app/.yarnrc.yml ../.yarnrc.yml
COPY app/package.json ../package.json

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the rest of the application code
COPY app/backend/ .

# Build the TypeScript application
RUN yarn build

# Expose the port Express.js runs on
EXPOSE 3001

# Run the Express.js application
CMD ["yarn", "start"] 