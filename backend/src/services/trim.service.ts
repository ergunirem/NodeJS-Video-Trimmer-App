
import ffmpeg from "fluent-ffmpeg";
import { resolve } from "path";

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export async function cutVideo() {
    console.log('Decoding video from local path');
    console.log('Trimming video with start time and length');

    await new Promise<void>((resolve, reject) => {
        ffmpeg('/Users/ergunirem/Desktop/Photos/Samsung Tel/WhatsApp/Media/WhatsApp Video/VID-20191217-WA0023.mp4')
            .output('../output/Video.mp4')
            .setStartTime(3)
            .setDuration(1)
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
};
