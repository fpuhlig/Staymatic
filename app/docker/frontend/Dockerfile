# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and yarn.lock for dependency installation
COPY app/frontend/package.json ./package.json
COPY app/yarn.lock ../yarn.lock
COPY app/.yarnrc.yml ../.yarnrc.yml
COPY app/package.json ../package.json

# Install dependencies using Yarn (respecting workspaces)
RUN yarn install --immutable

# Copy the rest of the application code
COPY app/frontend/ .
COPY app/backend/ ../backend/
COPY app/package.json ../package.json

# Build the Next.js application
RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "start"] 