const express = require('express');
const gooseRouter = require('../src/routers/gooseRouter');
const notesRouter = require('../src/routers/notesRouter');
const listRouter = require('./routers/listsRouter');
const userRouter = require('./routers/userRouter');
const BoardsRouter = require('./routers/BoardsRotuer');
require('./database/mongoose');


const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})

app.use(BoardsRouter);
app.use(userRouter);
app.use(listRouter);
app.use(notesRouter);
app.use(gooseRouter);



app.listen(port, ()=> console.log(`Server is on on port ${port}`))