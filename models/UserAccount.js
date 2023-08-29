const{ model, models, Schema } = require("mongoose");


const UserAccountSchema = new Schema({
    userEmail: {type:String, unique:true, required:true},
    firstName:String,
    lastName:String,
    email:String,
    address:String,
    city:String,
    state:String,
    postalCode:Number,

});

export const UserAccount = models?.UserAccount || model('UserAccount', UserAccountSchema);