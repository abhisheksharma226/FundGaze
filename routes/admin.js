const { Router } = require("express");

const router = Router();


router.get('/adminHome' , (req , res) => {
    res.render('adminHome')
})







module.exports = router;