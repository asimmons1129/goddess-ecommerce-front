const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items:Object,
    firstName:String,
    lastName:String,
    email:String,
    address:String,
    city:String,
    state:String,
    postalCode:Number,
    paid:Boolean,

}, {
    timestamps: true,
})

export const Order = models?.Order || model('Order', OrderSchema);