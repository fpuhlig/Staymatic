# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package files first (from root directory)
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

# Copy backend and shared package files (from app subdirectories)
COPY app/backend/package.json ./backend/
COPY app/shared/package.json ./shared/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the application code, shared code and config files
COPY app/backend/ ./backend/
COPY app/shared/ ./shared/
COPY app/config/ ./config/

# Expose the port Express.js runs on
EXPOSE 3001

# Run the Express.js development server
CMD ["yarn", "workspace", "@staymatic/backend", "dev"] 