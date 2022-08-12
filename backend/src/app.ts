import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { cutVideo } from "./services/trim.service"

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();
app.use(cors());
app.use(express.json()); //middleware to parse request body

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    //decode mp4 video with FFmpeg
    cutVideo();
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
