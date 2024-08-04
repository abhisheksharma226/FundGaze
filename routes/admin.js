const { Router } = require("express");
const Debtor = require('../models/debtor');


const router = Router();


router.get('/adminHome' , async(req , res) => {
    try {
        const totalDebtors = await Debtor.countDocuments();
        
        // Render the view and pass the debtor data
        return res.render('adminHome', {
          totalDebtors,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
        return res.status(500).send('Error fetching admin data');
      }
    });







module.exports = router;