const express = require('express');
const List = require('../models/List');
const auth = require('../middleware/auth');

const listRouter = new express.Router();

listRouter.post('/lists',auth, async(req,res)=>{  
    const newList = new List({...req.body,owner: req.user});
    try {
        const list = await newList.save();
        res.status(201).send(list);
    } catch (error) {
        res.status(500).send(error);
    }
})

listRouter.get('/lists',auth, async(req,res)=>{
    try {
        const allBoards = await List.find({owner:req.user._id});
        res.send(allBoards);
    } catch (error) {
        res.status(500).send(e);
    }
})

listRouter.delete('/lists/:id',auth, async(req,res)=>{
    try {
        const list = await List.findOne({_id:req.params.id, owner:req.user._id});
        await list.remove();
        res.status(204).send(list);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = listRouter;