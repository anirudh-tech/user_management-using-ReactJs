const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
require('./config/db')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/uploads',express.static(path.join(__dirname,"public","uploads")));
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const allowedOrigins = ['http://localhost:5173']
const corsOptions = {
    origin: (origin,callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true
}
app.use(cors(corsOptions))
app.use(cookieParser());

app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

app.use('/uploads',express.static(path.join(__dirname,"public","uploads")));


app.use('/',userRouter);
app.use('/admin',adminRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`running at port ${PORT}`);
})