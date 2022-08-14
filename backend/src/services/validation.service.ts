import { IAPIRequestSchema  } from '../models/models';

export function validateInput(doc: IAPIRequestSchema ) {
    if(doc.length <= 0 || doc.startTime <= 0)
        throw new Error('Start time or length cannot be equal to or smaller than 0');
    if(doc.length > 60000)
        throw new Error('You can only trim a minute long video. Length cannot be bigger than 60000');
}
