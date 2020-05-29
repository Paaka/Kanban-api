const mongoose = require('mongoose');
const Note = require('./Note');

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



listSchema.pre('remove', async function(next){
    const list = this;
    console.log(`Ciekawe czy zadziala`)
    await Note.deleteMany({listID: list._id});

    next();
})

const Lists = mongoose.model('Lists',listSchema);


module.exports = Lists;