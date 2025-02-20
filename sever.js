import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { connectDB } from './database/connection.js'
import InventoryRoute from './routes/inventoryroute.js'


dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express()

const corsOptions = {
    origin: true,
    credentials: true,
  };


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


app.get('/',(req,res)=>{
    res.send('Working')
})

app.use('/inventory',InventoryRoute)



app.listen(PORT,()=>{
    connectDB()
    console.log(`Server started on port ${PORT}`);
})