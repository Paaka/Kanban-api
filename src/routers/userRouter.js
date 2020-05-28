const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const Router = new express.Router();

Router.get('/users',async (req,res)=>{
    console.log(req.body);
    res.send('Hey');
});

Router.post('/users',async (req,res)=>{

    const user = new User(req.body);
    try{
        await user.save()
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send("nie działa :(")
    }
});

Router.post('/users/login',async(req,res)=> {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    }catch(err){
        res.status(400).send();
    }
})

Router.post('/users/logout', auth, async(req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=> token.token !== req.token);

        await req.user.save();

        res.send('You logged out sucessfully');
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = Router;

