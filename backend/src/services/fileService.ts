import { promises } from 'fs';

export const writeFileAsync = async (filename: string, result: string): Promise<string> =>  {
    
    await promises.writeFile(filename, result, {
        flag: 'w',
    });
    
    return "Data successfully saved!";
}

