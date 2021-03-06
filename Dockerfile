# Get latest node as Base image
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy the package.json file containing dependencies
COPY ["package.json", "package-lock.json*", "./"]

# Install the dependencies into the container
RUN npm install

# Copy the app files into the container
COPY . .

# Set our port as an env variable
ENV PORT=8080

# Run command within the container
CMD ["npm", "start"]
