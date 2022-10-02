import { promises } from 'fs';

export const writeFileAsync = async (filename: string, result: string): Promise<string> =>  {
    await promises.writeFile(filename, result, {
        flag: 'w',
    });
    return "Data successfully saved!";
}

export const readFileAsync = async (filename: string) : Promise<number> => {
    const number = parseFloat((await promises.readFile(filename)).toString()); 
    return number;
}