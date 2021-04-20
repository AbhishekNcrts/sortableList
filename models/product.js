const {Schema,model} = require('mongoose');

var Product = new Schema({
    name: {
        type:String,
        required:true
    },
price:{
    type:Number,
    default:0
},
sorting:{
    type:Number,
    default:0
}
});

module.exports = model('Product',Product);