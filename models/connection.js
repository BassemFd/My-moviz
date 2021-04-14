var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect('mongodb+srv://admin:<insertPass>@cluster0.8wqyi.mongodb.net/mymovizdb?retryWrites=true&w=majority',
    options,
    function(err) {
    console.log(err);
    }
    );
