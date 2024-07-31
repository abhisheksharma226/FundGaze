const { createHmac , randomBytes } = require("crypto");
const { Schema , model } = require("mongoose");


const debtorSchema = new Schema({
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
debtorSchema.pre("save" , function(next) {
    const debtor = this;

    if(!debtor.isModified("password"))
    return;

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256" , salt)
    .update(debtor.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();

});


debtorSchema.statics.matchPasswordAndGenerateToken = async function({ email, password }) {
    try {
        const debtor = await this.findOne({ email });
        if (!debtor) throw new Error("User not found!");

        const salt = debtor.salt;
        const hashedPassword = debtor.password;

        const debtorProvidedHash = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== debtorProvidedHash) throw new Error("Incorrect password");

        return debtor;

        // const token = createTokenForUser(debtor);
        // return token;
    } catch (error) {
        // console.error("Error in matchPasswordAndGenerateToken:", error);
        throw error;
    }
};





const Debtor = model("debtor" , debtorSchema)


module.exports = Debtor;