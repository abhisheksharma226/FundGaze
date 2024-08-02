const JWT = require("jsonwebtoken");


const secret = process.env.SECRET_KEY;

function createTokenForUser(debtor){
    const payload = {
        _id: debtor._id,
        fullName: debtor.fullName,
        email: debtor.email,
        profileImageURL: debtor.profileImageURL,
        role: debtor.role,
    };
    const token = JWT.sign(payload , secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token , secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};