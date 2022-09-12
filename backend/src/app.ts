import express from "express";
import cors from "cors";
import { PORT,ORIGIN } from "./configuration";
import { errorHandler } from "./middlewares";
import { rootRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(cors({origin: ORIGIN, credentials: true}));
app.use(errorHandler);
app.use(rootRouter);
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})

