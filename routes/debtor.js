const { Router } = require("express");
const Debtor = require('../models/debtor');

const router = Router();


router.get('/signup' , (req , res) => {
    return res.render('signup')
})

router.get('/signin' , (req , res) => {
    return res.render('signin')
})

router.get('/debtorHome' , (req , res) => {
    return res.render('debtorHome')
})



router.post('/signup' , async(req , res) => {
    const { fullName , email , password } = req.body;

    try{ 
        await Debtor.create({
            fullName,
            email,
            password,
        });
        return res.redirect('debtorHome');

    }catch(error){
        return res.render("signup" , {
            error : "Email Already Exist!"
        })
    }
    
})



router.post('/signin' , async(req , res) => {
     const { email , password } = req.body;

     try{

         const debtor = await Debtor.matchPasswordAndGenerateToken({ email, password });

         // console.log('Debtor' , debtor);
         return res.redirect('debtorHome');
        
        }catch (error){
            return res.render("signin" , {
                error : "Incorrect Email or Password" ,
        })

    }

    })



module.exports = router;