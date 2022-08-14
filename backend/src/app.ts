import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import * as fs from 'fs';
import * as path from 'path';
import { cutVideo } from "./services/trim.service";
import { downloadVideoFromURL } from "./services/download.service";
import { errorHandler } from './middlewares/error.handler';
import { APIRequest } from './models/models'
import { mongooseConnectDB } from './services/mongoose.service'

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
mongooseConnectDB(MONGODB_URI);

app.get('/', function(req: Request, res: Response){
    //Gets the requested file name from URL
    const fileName = req.query["filename"] !== undefined ? req.query["filename"] : '';

    // Transfers the file at path as an ‘attachment’.
    // Browser will prompt client to download
    res.download(`../output/${fileName}`);
});

app.post('/', async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        //Creates a GridFS bucket
        //It is a group of MongoDB collections with the chunks of files
        const gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
            chunkSizeBytes:1024,
            bucketName:'outputVideoBucket'
        });
        console.log("GridFSBuck: outputVideoBucket created!");

        // console.log(req.body);
        //An instance of a model is called a document 'doc'
        //Creates a doc from APIRequest model with Request body's JSON
        const doc = new APIRequest(req.body);

        //save() makes Mongoose insert the doc && handles simple input validation for invalid values
        await doc.save();
        console.log(doc);

        //downloads video from URL
        await downloadVideoFromURL(doc.videoURL, 'input');

        //decodes mp4 video with FFmpeg
        const outputFilePath = await cutVideo(doc.videoURL, doc.startTime, doc.length);
        console.log(`outputFilePath ${outputFilePath}`);
        const outputFileName = path.basename(outputFilePath);

        //Uses fs to read output file & saves it to GridFSBucket chunk by chunk
        fs.createReadStream(outputFilePath)
            .pipe(gridfsbucket.openUploadStream(outputFileName))
            .on('error', ()=>{
                console.log('Error occured while uploading output to MongoDB');
            })
            .on('finish', ()=>{
                console.log(`Ouput file ${outputFileName} saved to MongoDB`);
            });

        //Creates response and sends trimmed video URL in JSON format
        res.status(201); //Created
        res.json({trimmedVideo: `http://localhost:${PORT}/?filename=${outputFileName}`});
    } catch(error: any) {
        next(error);
    }
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

