const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://admin:admin123@kanban-uhqcb.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);
