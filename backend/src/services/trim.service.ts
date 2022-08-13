
import ffmpeg from "fluent-ffmpeg";
import { resolve } from "path";
import * as path from 'path';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export async function cutVideo(videoUrl: string, startTime: number, length: number) {
    console.log('Decoding video from local path');
    console.log('Trimming video with start time and length');

    //Convert milliseconds to seconds for ffmpeg
    const startTimeInSeconds = ((startTime % 60000) / 1000).toFixed(0);
    const lengthInSeconds = ((length % 60000) / 1000).toFixed(0);
    const endSeconds = (( (startTime + length) % 60000) / 1000).toFixed(0);

    //Get file name and create paths
    const fileName = path.basename(videoUrl);
    const localFilePath = '../input/' + fileName;
    const outputFilePath =
        '../output/' + startTimeInSeconds
        + 'till' + endSeconds
        + fileName;

    await new Promise<void>((resolve, reject) => {
        ffmpeg(localFilePath)
            .output(outputFilePath)
            .setStartTime(startTimeInSeconds)
            .setDuration(lengthInSeconds)
            // .withVideoCodec('copy')
            // .withAudioCodec('copy')
            .on('end', function(err) {
                if(!err) {
                    console.log('Conversion done!');
                    resolve();
                }
            })
            .on('error', function (err) {
                console.log('error: ', err);
                reject(err);
              })
            .run();
    })
    return outputFilePath;
};
