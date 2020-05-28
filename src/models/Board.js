const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
})

const Board = mongoose.model('Boards',boardSchema)

module.exports = Board;