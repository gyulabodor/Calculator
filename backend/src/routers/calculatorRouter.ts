import { Router } from "express";
import { writeFileAsync } from "../services";
import { FILENAME } from "../configuration";

export const calculatorRouter = Router();

calculatorRouter.post("/save" ,async (req,res,next) =>{
    
    const number = req.body.result;
    
    try {
       const result = await writeFileAsync(FILENAME || "./src/data/result.txt", number);
       
       res.status(201).send({success: result});
    } catch (error) {
        next(error);
    }

});

