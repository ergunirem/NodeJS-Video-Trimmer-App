# Specifiy image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files from host inside the containers working directory
COPY package*.json ./

#Install dependencies inside container
RUN npm install

# Bundle App Sources
COPY . .

# Inform Docker that container listens on 3000 at runtime
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
