const{ model, models, Schema } = require("mongoose");

const ProductSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
    stock: {type:Number, required:true},
});

export const Product = models?.Product || model('Product', ProductSchema);

