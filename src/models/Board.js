const mongoose = require('mongoose');
const List = require('./List');

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

boardSchema.pre('remove',async function(next){
    const board = this;
    const lists = await List.find({listOwner: board._id})
    lists.forEach(list => list.remove());
    console.log(lists)
    next();
})

const Board = mongoose.model('Boards',boardSchema)

module.exports = Board;