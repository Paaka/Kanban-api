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

listRouter.patch('/lists', auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['listID','newTitle'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));

    if(!isUpdateValid){
        return res.status(400).send({error: 'Invalid Update'});
    }

    try {
        const listToUpdate = await List.findOne({owner:req.user._id, _id: req.body.listID});
        listToUpdate.listTitle = req.body.newTitle;
        await listToUpdate.save();
        res.send({});
    } catch (error) {
        res.status(400).send({error: 'Invalid updates'})
    }
})

module.exports = listRouter;