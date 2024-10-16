const { Schema , model } = require("mongoose");


const fundRaisedSchema = new Schema({
    amount : {
        type : Number ,
        required : true ,
    },

    equity : {
        type : Number ,
        required : true ,
    },

    businessEmail : {
        type : String ,
        required : true ,
    },
})


const FundRaised = model("FundRaised" , fundRaisedSchema);


module.exports = FundRaised;