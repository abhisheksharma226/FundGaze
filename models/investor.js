const { createHmac , randomBytes } = require("crypto");
const { Schema , model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication")


const investorSchema = new Schema({
    fullName : {
        type : String , 
        required : true,
    } , 
    email : {
        type : String , 
        required : true,
        unique : true ,
    } ,
    salt : {
        type : String ,

    } ,
    password : {
        type : String , 
        required : true , 

    } ,
    profileImageURL : {
        type : String , 
        default : "/images/default.png"
    } , 


    role : {
        type : String , 
        enum : ["USER" , "ADMIN"],
        default : "USER" ,
    } ,
} , { timestamps : true }
);

//We use Hmac for Hashed the password
investorSchema.pre("save" , function(next) {
    const investor = this;

    if(!investor.isModified("password"))
    return;

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256" , salt)
    .update(investor.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();

});


investorSchema.statics.matchPasswordAndGenerateToken = async function({ email, password }) {
    try {
        // console.log('Looking for user with email:', email);

        const investor = await this.findOne({ email });
        // console.log(debtor)

        if (!investor) throw new Error("User not found!");

        const salt = investor.salt;
        const hashedPassword = investor.password;

        const investorProvidedHash = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== investorProvidedHash) 
            throw new Error("Incorrect password");


        const token = createTokenForUser(investor);
        return token;

    } catch (error) {
        // console.error("Error in matchPasswordAndGenerateToken:", error);
        throw error;
    }
};





const Investor = model("investor" , investorSchema)


module.exports = Investor;