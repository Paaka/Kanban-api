const mongoose = require('mongoose');

const Note = mongoose.model('Notes', {
    content:{
        type:String,
        required:true,
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
    }
});

module.exports = Note;