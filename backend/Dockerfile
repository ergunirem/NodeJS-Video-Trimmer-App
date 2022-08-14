# Specifiy image
FROM node:18

# Set working directory inside container
WORKDIR /app
WORKDIR /input
WORKDIR /output

# Copy package files from host inside the containers working directory
COPY package*.json tsconfig.json .env ./
# Bundle App Sources
COPY . .

# RUN npm install -g typescript
# RUN npm install -g ts-node

#Install dependencies inside container
RUN npm install

# Compile typescript files
RUN npm run build

# Inform Docker that container listens on 3000 at runtime
EXPOSE 3000

# Run the application
CMD ["node", "dist/app.js"]

