import express from "express";
import cors from "cors";
import { PORT,ORIGIN } from "./configuration";

const app = express();
app.use(express.json());
app.use(cors({origin: ORIGIN, credentials: true}));
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})

