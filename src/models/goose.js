const mongoose = require('mongoose');

const Goose = mongoose.model('Gooses',{
    name:{
        type:String,
        required:true,
        trim:true,
    },
    color:{
        type:String,
        required:true,
    }
})

module.exports = Goose;