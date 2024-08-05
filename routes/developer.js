const { Router } = require("express");


const router = Router();

router.get('/aboutDeveloper' , (req , res) =>{
    res.render('developer')
})


module.exports = router;