const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const notesRouter = new express.Router();

notesRouter.post('/notes', auth, async(req,res)=>{
    console.log(req.body);
    const newNote =new Note({...req.body, owner:req.user._id});
    console.log(newNote)
    try{
        const note = await newNote.save();
        res.status(201).send(note);
    }catch(err){
        res.status(500).send(err);
    }
})

notesRouter.get('/notes',auth, async(req,res)=>{
    try {
        const allNotes = await Note.find({owner:req.user._id});
        res.send(allNotes);
    } catch (error) {
        res.status(400).send(error)
    }
})

notesRouter.get('/notes/:id', async(req,res)=>{
    const id = req.params.id;
    
    try {
        const specyficNote = await Note.findById(id);

        if(!specyficNote){
            return res.status(400).send(`Note with that id doesn't exists`);
        }

        res.send(specyficNote);
    } catch (error) {
        res.status(500).send(error);
    }
})

notesRouter.patch('/notes',auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpadtes = ['cardID','listID'];
    const isUpdateValid = updates.every(update => allowedUpadtes.includes(update));

    if(!isUpdateValid){
        return res.status(400).send({error: 'Invalid Update'});
    }

    try {
        const updatedNote = await Note.findOne({owner: req.user._id, _id:req.body.cardID});
        updatedNote.listID = req.body.listID;
        await updatedNote.save();
        res.send(updatedNote);
    } catch (error) {      
        res.status(400).send(error);
    }
})

module.exports = notesRouter;