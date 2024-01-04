# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD ["npm", "start"]