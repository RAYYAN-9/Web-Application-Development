let mongoose=require('mongoose');
let Schema = mongoose.Schema;
let studentSchema=new Schema({
    name:{
        type:String,
        required:true   
    },
    rollNo:{
        type:Number,
        required:true,
        unique:true
    }   
});
module.exports=mongoose.model('Student',studentSchema);