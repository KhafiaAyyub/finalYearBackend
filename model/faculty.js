const mongoose = require("mongoose");
// const { Number } = require("twilio/lib/twiml/VoiceResponse");


const Facultyschema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
  
    name:{
        type: String,
        required:[true,"Batch is required"]
    },
    profession: {
        type: String,
        required:[true,"profession is required"]
    },
    specialization:{
        type:String,
        required:[true,"Profession is required"]
    },
  
    // photo:  {type: mongoose.Schema.Types.ObjectId, ref: 'File' },
      qualification:{
        type:String,
        required:[true,"Qualification is required"]
      },
      phone:{
        type:String
      },     
      image: { 
        data: Buffer, 
        contentType: String 
      },
    // // role:{
    //
});
module.exports = mongoose.model('Faculty',Facultyschema);
