import express from 'express'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { SystemError } from './utils/createError';
import authRouter from './routers/auth';
import userRouter from './routers/user';
import hotelRouter from './routers/hotel';
import reservationRouter from './routers/reservation';
import roomRouter from './routers/room';
import roomNumberRouter from './routers/roomnumber';
import roomTypeRouter from './routers/roomtype';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log(err)
    }
}

mongoose.connection.on('error', (error: Error) => console.log(error));

// middlewares
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/room", roomRouter);
app.use("/api/roomnumber", roomNumberRouter);
app.use("/api/roomtype", roomTypeRouter);

app.use((err: SystemError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Error!!!';
    res.status(status).json(message);
})

app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log(`Server runnig on http://localhost:${process.env.PORT}/`);
});