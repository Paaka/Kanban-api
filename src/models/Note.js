const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    priority:{
        type:Number,
        default:1,
    },
    description:{
        type:String,
        default:'',
    },
    listID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Lists',
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
}, {timestamps:true})

const Note = mongoose.model('Notes', notesSchema);

module.exports = Note;