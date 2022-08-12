import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import ffmpeg from "fluent-ffmpeg";
import { resolve } from "path";

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();
app.use(cors());
app.use(express.json()); //middleware to parse request body

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

async function cutVideo() {
    console.log('Start cutting the video...');

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

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    //decode mp4 video with FFmpeg
    console.log('Decoding from local and trimming...')
    cutVideo();
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
