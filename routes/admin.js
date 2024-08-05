const { Router } = require("express");
const Debtor = require('../models/debtor');
const Investor = require('../models/investor')

const router = Router();


router.get('/adminHome' , async(req , res) => {
    try {
        const totalDebtors = await Debtor.countDocuments();
        const totalInvestors = await Investor.countDocuments();
        
        // Render the view and pass the debtor data
        return res.render('adminHome', {
          totalDebtors,
          totalInvestors,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
        return res.status(500).send('Error fetching admin data');
      }
    });




    router.get('/logout' ,(req , res) => {
      res.clearCookie('token')
      .redirect('/');
  })



module.exports = router;