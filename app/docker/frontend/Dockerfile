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
COPY app/frontend/ ./app/frontend/
COPY app/shared/ ./app/shared/
COPY app/config/ ./app/config/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Expose the port Next.js dev server runs on
EXPOSE 3000

# Run the Next.js development server
CMD ["yarn", "workspace", "@staymatic/frontend", "dev"]