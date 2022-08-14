import mongoose from 'mongoose';
import * as fs from 'fs';
// import { GridFSBucket } from 'gridfs-stream'

export function mongooseConnectDB(URI: string) {

    mongoose.connect(URI);

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
}

export function createGridFSBucket() {
    console.log("GridFSBucket: outputVideoBucket created!");
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        chunkSizeBytes:1024,
        bucketName:'outputVideoBucket'
    });
}

export function saveOutputToMongoDB(gridfsbucket: any, outputFilePath: string, outputFileName: string) {
    fs.createReadStream(outputFilePath)
    .pipe(gridfsbucket.openUploadStream(outputFileName))
    .on('error', ()=>{
        console.log('Error occured while uploading output to MongoDB');
    })
    .on('finish', ()=>{
        console.log(`Ouput file ${outputFileName} saved to MongoDB`);
    });
}
