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
    return res.render('debtorHome' , {
        debtor: req.debtor,
    })
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
        
         const token = await Debtor.matchPasswordAndGenerateToken({ email, password });

         return res.cookie('token' , token).redirect('debtorHome');
        
        }catch (error){
            console.error("Error in /signin:", error);
            return res.render("signin" , {
                error : "Incorrect Email or Password" ,
        })

    }

    })


router.get('/logout' ,(req , res) => {
    res.clearCookie('token')
    .redirect('home');
})



module.exports = router;