`use strict`
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const configs = (app)=>{
    app.use(cors())
    app.use(morgan("dev"))
    app.use(helmet)
}

export const initServer = ()=>{
    const app = express();
    try{
        configs(app)
        app.listen(process.env.PORT)
        console.log(`Server running in ${process.env.PORT}`)
    }catch(error){
        console.log(`Server init to fail ${error}`)
    }
}