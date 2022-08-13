import { Schema, model } from "mongoose";

//Creates an interface representing a document in MongoDB
interface IAPIRequestSchema {
    videoURL: string;
    startTime: number;
    length: number;
}

//The schema collects fields sent from the API request
const APIRequestSchema = new Schema<IAPIRequestSchema>({
    videoURL: {
        type: String,
        required: true,
    },
    startTime: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    }
});

//Mongoose compiles a model when model() is called
export const APIRequest = model<IAPIRequestSchema>('APIRequest', APIRequestSchema);
