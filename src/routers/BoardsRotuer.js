const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/auth');

const Router = new express.Router();

Router.post('/BoardsAPI',auth, async(req,res)=>{
    const newBoard = new Board({...req.body, owner:req.user._id});

    try {
        const board = await newBoard.save();
        res.send(board);
    } catch (error) {
        res.status(400).send(error);
    }
})


Router.get('/Dashboards', auth, async(req,res)=>{
    try {
        const allBoards = await Board.find({owner:req.user._id});
        res.send(allBoards);
    } catch (error) {
        res.status(500).send(e);
    }
})

Router.delete('/Dashboards/:id', auth, async(req,res)=>{

    try {
        const board = await Board.findOne({_id:req.params.id,owner:req.user._id});
        await board.remove();
        res.send(board);
    } catch (error) {
        res.status(500).send(error);
    }
})

Router.patch('/Boards', auth, async(req,res)=> {
  const updates = Object.keys(req.body);
  const allowedUpadates = ['boardID', 'newTitle'];
  const isUpdateValid = updates.every(update => allowedUpadates.includes(update));

  if(!isUpdateValid){
      return res.status(400).send({error:'Invalid updates'});
  }

  try {
      const updatedBoard = await Board.findOne({_id:req.body.boardID, owner:req.user._id});
      updatedBoard.title = req.body.newTitle;
      await updatedBoard.save();
      res.status(200).send();
  } catch (error) {
      res.status(400).error(error)
  }
  
})
module.exports = Router;