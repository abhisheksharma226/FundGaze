const { Router } = require("express");
const Investor = require('../models/investor');

const router = Router();

router.get('/investorHome' , (req , res) => {
    res.render('investorHome')
})

router.get('/investorSignin' , (req , res) => {
    res.render('investorSignin')
})

router.get('/investorSignup' , (req , res) => {
    res.render('investorSignup');
})

router.post('/investorSignin' , async(req , res) => {
    const { email , password } = req.body;

    try{
       
        const token = await Investor.matchPasswordAndGenerateToken({ email, password });

        return res.cookie('token' , token).redirect('investorHome');
       
       }catch (error){
           // console.error("Error in /signin:", error);
           return res.render("investorSignin" , {
               error : "Incorrect Email or Password" ,
       })

   }

   })



router.post('/investorSignup' , async(req , res) => {
    const { fullName , email , password } = req.body;

    try{ 
        await Investor.create({
            fullName,
            email,
            password,
        });
        return res.redirect('investorHome');

    }catch(error){
        return res.render("investorSignup" , {
            error : "Email Already Exist!"
        })
    }
    
})









module.exports = router;