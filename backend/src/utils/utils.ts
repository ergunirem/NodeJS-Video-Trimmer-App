import * as fs from 'fs';

export function fileExists(filePath: string) {
    if (fs.existsSync(filePath))
        return true;
    else
        false;
}
