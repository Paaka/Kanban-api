const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    listTitle:{
        type:String,
        required:true,
    },
    listOwner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Boards'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
});

const Lists = mongoose.model('Lists',listSchema);


module.exports = Lists;