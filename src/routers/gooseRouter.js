const express = require('express');
const Goose = require('../models/goose');

const gooseRouter = new express.Router();

gooseRouter.get('/goose/:id', async(req,res)=>{
    const id = req.params.id;
    
    try {
        const specyficGoose = await Goose.findById(id);
        if(!specyficGoose){
            return res.status(400).send('Goose not found');
        }

        res.send(specyficGoose);
    } catch (error) {
        res.status(500).send(error);
    }
})

gooseRouter.get('/goose', async(req,res)=>{
    try{
        const allGooses = await Goose.find({});
        res.send(allGooses);
    }catch(err){
        res.status(500).send(err);
    }
})

gooseRouter.post('/goose', async(req,res)=>{
    const newGoose = new Goose(req.body);

    try {
        await newGoose.save();
        res.send(newGoose);
    } catch (error) {
        res.status(400).send(error);
    }
})

gooseRouter.get('/help', (req,res)=>{
    res.send(`Yeah matt i'm okey`)
})

module.exports = gooseRouter;