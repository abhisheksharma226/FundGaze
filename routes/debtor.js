const { Router } = require("express");
const Debtor = require('../models/debtor');

const router = Router();


router.get('/signup' , (req , res) => {
    return res.render('signup')
})

router.get('/signin' , (req , res) => {
    return res.render('signin')
})



router.post('/signup' , async(req , res) => {
    const { fullName , email , password } = req.body;

    await Debtor.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
    
})



router.post('/signin' , async(req , res) => {
    
    const { email , password } = req.body;
    const debtor = await Debtor.matchPasswordAndGenerateToken({ email, password });

    // console.log('Debtor' , debtor);
    return res.redirect('/');

    })



module.exports = router;