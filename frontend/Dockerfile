FROM node:18-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app
RUN npm install

# Running the app
CMD "npm" "run" "dev"