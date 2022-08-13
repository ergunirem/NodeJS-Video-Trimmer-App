import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';

export async function downloadVideoFromURL(videoUrl: string, downloadFolder: string) {

    const fileName = path.basename(videoUrl); //used to get the file name from the URL
    const localFilePath = '../input/' + fileName;// The path of the downloaded file on our machine
    console.log(`localFilePath ${localFilePath}`);
    try {
        const res = await axios({
            method: 'GET',
            url: videoUrl,
            responseType: 'stream',
          });

        const w = res.data.pipe(fs.createWriteStream(localFilePath));
        w.on('finish', () => {
            console.log('Successfully downloaded file!');
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
