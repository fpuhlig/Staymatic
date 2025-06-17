# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package files first (from root directory)
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

# Create app directory structure and copy only needed workspaces
RUN mkdir -p app
COPY app/backend/ ./app/backend/
COPY app/shared/ ./app/shared/
COPY app/config/ ./app/config/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Expose the port the app runs on
EXPOSE 3001

# Run the backend development server
CMD ["yarn", "workspace", "@staymatic/backend", "dev"] 