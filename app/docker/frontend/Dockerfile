# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package files first (from root directory)
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

# Copy frontend and shared package files (from app subdirectories)
COPY app/frontend/package.json ./frontend/
COPY app/shared/package.json ./shared/

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the application code, shared code and config files
COPY app/frontend/ ./frontend/
COPY app/shared/ ./shared/
COPY app/config/ ./config/

# Expose the port Next.js dev server runs on
EXPOSE 3000

# Run the Next.js development server
CMD ["yarn", "workspace", "@staymatic/frontend", "dev"] 