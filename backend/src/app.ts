import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { cutVideo } from "./services/trim.service";
import { downloadVideoFromURL } from "./services/download.service";
import { errorHandler } from './middlewares/error.handler';
import { APIRequest } from './models/models'

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();
app.use(cors());
app.use(express.json()); //middleware to parse request body

// Builds the connection string with type guard for string && Creates the database connection
const MONGODB_URI: string = process.env.MONGODB_URI !== undefined ? process.env.MONGODB_URI : '';
mongoose.connect(MONGODB_URI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});
mongoose.connection.on('error',function (err) {
    console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});

app.post('/', async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        //An instance of a model is called a document 'doc'
        //Creates a doc from APIRequest model with Request body's JSON
        const doc = new APIRequest(req.body);

        //save() makes Mongoose insert the doc && handles simple input validation for invalid values
        await doc.save();
        console.log(doc);

        //downloads video from URL
        await downloadVideoFromURL(doc.videoURL, 'input');

        //decodes mp4 video with FFmpeg
        cutVideo();

        //TODO Responses should be in JSON format
        res.send(req.body);
    } catch(error: any) {
        next(error);
    }
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

