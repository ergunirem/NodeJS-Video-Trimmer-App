# NodeJS-Video-Trimmer-App
A full stack app that takes 
- the URL of a video
- a start timestamp (miliseconds)
- a length (miliseconds)

returns a public URL to download

- the trimmed video

# Prerequisites
- nodeJS
- npm
- docker

# Setup
## Frontend
- ```cd frontend && npm install && npm run serve```
- Check the terminal to see where your frontend is running i.e. http://localhost:8080/

## Backend
- ```cd ../backend```
- Create .env file which contains valid PORT and MONGODB_URI variables
- To see it in development mode: ```npm install && npm run dev``` This will run the nodemon to apply immediate changes to your program
- To build it with Dockerfile ```docker build -t your-image-name . && docker run -p 3000:3000 -d your-image-name```




# Trim a Video
- Go to your frontend app and fill in the input form 
## Example Input
  - videoURL: https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4
  - startTime: 5000
  - length: 2000
