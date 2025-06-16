# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package files first
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

# Copy frontend package files
COPY frontend/package.json ./frontend/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the application code
COPY frontend/ ./frontend/

# Build the Next.js application
RUN yarn workspace @staymatic/frontend build

# Expose the port Next.js runs on
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "workspace", "@staymatic/frontend", "start"] 